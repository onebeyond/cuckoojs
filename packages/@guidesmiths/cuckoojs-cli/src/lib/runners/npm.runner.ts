import {GenericRunner} from './generic.runner';
import {join} from 'path';
import {promises as fs} from 'fs';
import sortObjectKeys from '../utils/sortObjectByKeys';

export interface PackageEntry {
	name: string;
	version: string;
	section: PackageDependencySection;
}

export interface ScriptEntry {
	name: string;
	value: string;
}

type PackageDependencySection = 'dependencies' | 'devDependencies';

type PackageSection = 'scripts' | PackageDependencySection;

type PackageJson = Record<PackageSection, Record<string, string>>;

export class NpmRunner extends GenericRunner {
	private static ensurePackageSection(packageJson: PackageJson, section: PackageSection) {
		if (!packageJson[section]) {
			packageJson[section] = {};
		}
	}

	private static buildPackageJsonPath(name: string) {
		return join(process.cwd(), name, 'package.json');
	}

	private static async loadPackageJson(path: string) {
		return JSON.parse(await fs.readFile(path, {encoding: 'utf-8'})) as PackageJson;
	}

	constructor() {
		super('npm');
	}

	public async install(name: string) {
		const args = [`--prefix ${name}`];
		await super.run({command: 'install', args, stdio: 'pipe'});
	}

	public async runScript(name: string, script: string) {
		const args = [`--prefix ${name} ${script}`];
		await super.run({command: 'run', args});
	}

	public async addPackages(name: string, packageEntries: PackageEntry[]) {
		const packagePath = NpmRunner.buildPackageJsonPath(name);
		const packageJson = await NpmRunner.loadPackageJson(packagePath);

		for (const packageEntry of packageEntries) {
			NpmRunner.ensurePackageSection(packageJson, packageEntry.section);
			packageJson[packageEntry.section][packageEntry.name] = packageEntry.version;
			packageJson[packageEntry.section] = sortObjectKeys(packageJson[packageEntry.section]) as Record<string, string>;
		}

		await fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2));
	}

	public async addScripts(name: string, scripts: ScriptEntry[]) {
		const packagePath = NpmRunner.buildPackageJsonPath(name);
		const packageJson = await NpmRunner.loadPackageJson(packagePath);
		NpmRunner.ensurePackageSection(packageJson, 'scripts');

		for (const script of scripts) {
			packageJson.scripts[script.name] = script.value;
		}

		await fs.writeFile(packagePath, JSON.stringify(packageJson, null, 2));
	}
}
