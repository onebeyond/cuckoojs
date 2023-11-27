import { type Tree } from '@angular-devkit/schematics';
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

interface IInsertDependencyOptions {
  ordered?: boolean;
  overwrite?: boolean;
}

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

  // @TODO: deprecate and replace all usages with addDependency or addDevDependency
  addPackage(name: string, version: string, dev = false) {
    const section = dev ? 'devDependencies' : 'dependencies';
    this.addWithPath([section, name], version, {
      ordered: true,
      overwrite: true,
    });
  }

  addDependency(name: string, version: string) {
    this.addWithPath(['dependencies', name], version, {
      ordered: true,
      overwrite: true,
    });
  }

  addDevDependency(name: string, version: string) {
    this.addWithPath(['devDependencies', name], version, {
      ordered: true,
      overwrite: true,
    });
  }

  addScript(name: string, value: string) {
    this.addWithPath(['scripts', name], value);
  }

  addWithPath(
    path: string[],
    value: string,
    options: IInsertDependencyOptions = {},
  ) {
    this.content = this.insertDependency(path, value, options);
    this.host.overwrite(this.path, this.content);
  }

  private checkFileContent() {
    const packageErrors: ParseError[] | undefined = [];
    parseTree(this.content, packageErrors);
    if (packageErrors.length) {
      const { error, offset: errorLocation } = packageErrors[0];
      throw new Error(
        `Failed to parse file ${this.path}. ${printParseErrorCode(
          error,
        )} at location ${errorLocation}.`,
      );
    }
  }

  private insertDependency(
    path: JSONPath,
    value: string,
    options: IInsertDependencyOptions = { ordered: false, overwrite: false },
  ) {
    const propertyToInsert = path.slice(-1)[0];
    const getInsertionIndex = options.ordered
      ? // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
        (properties: Segment[]) =>
          [...properties, propertyToInsert]
            .sort()
            .findIndex((p) => p === propertyToInsert)
      : undefined;

    if (!options.overwrite) {
      const tree = parseTree(this.content);
      if (tree) {
        const prevValue: string = findNodeAtLocation(tree, path)
          ?.value as string;
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
