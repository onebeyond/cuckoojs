import {type Tree} from '@angular-devkit/schematics';
import {
	type ParseError,
	type JSONPath,
	type Segment,
	parseTree,
	printParseErrorCode,
	modify,
	applyEdits,
	findNodeAtLocation,
} from 'jsonc-parser';

// eslint-disable-next-line @typescript-eslint/naming-convention
type TInsertDependencyOptions = {
	ordered?: boolean;
	overwrite?: boolean;
};

export class PackageJsonUtils {
	content: string;
	host: Tree;
	path: string;

	constructor(host: Tree, path = './package.json') {
		const buffer = host.read(path);
		if (!buffer) {
			throw new Error(`Path ${path} not found.`);
		}

		this.content = buffer.toString();

		this.host = host;
		this.path = path;

		this.checkFileContent();
	}

	addPackage(name: string, version: string, dev = false) {
		const section = dev ? 'devDependencies' : 'dependencies';
		this.content = this.insertDependency([section, name], version, {ordered: true, overwrite: true});
		this.host.overwrite(this.path, this.content);
	}

	addScript(name: string, value: string) {
		this.content = this.insertDependency(['scripts', name], value);
		this.host.overwrite(this.path, this.content);
	}

	private checkFileContent() {
		const packageErrors: ParseError[] | undefined = [];
		parseTree(this.content, packageErrors);
		if (packageErrors.length) {
			const {error, offset: errorLocation} = packageErrors[0];
			throw new Error(`Failed to parse file ${this.path}. ${printParseErrorCode(error)} at location ${errorLocation}.`);
		}
	}

	private insertDependency(path: JSONPath, value: string, options: TInsertDependencyOptions = {ordered: false, overwrite: false}) {
		const propertyToInsert = path.slice(-1)[0];
		const getInsertionIndex = options.ordered
		// eslint-disable-next-line @typescript-eslint/require-array-sort-compare
			? (properties: Segment[]) => [...properties, propertyToInsert]
				.sort()
				.findIndex(p => p === propertyToInsert)
			: undefined;

		if (!options.overwrite) {
			const tree = parseTree(this.content);
			if (tree) {
				const prevValue: string = findNodeAtLocation(tree, path)?.value as string;
				if (prevValue && !prevValue.includes(value)) {
					value = value.concat(' && ', prevValue);
				}
			}
		}

		const editResult = modify(this.content, path, value, {
			formattingOptions: {
				tabSize: 2,
				insertSpaces: true,
			},
			getInsertionIndex,
		});
		const updatedPackage = applyEdits(this.content, editResult);
		this.checkFileContent();
		return updatedPackage;
	}
}
