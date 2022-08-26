import {Rule, SchematicContext, externalSchematic, Tree, branchAndMerge, chain} from '@angular-devkit/schematics';
import {RunSchematicTask} from '@angular-devkit/schematics/tasks';
import {join} from 'path';
import {ApplicationSchema} from './application.schema';

interface PackageEntry {
  name: string
  value: string
}

type PackageSection = 'scripts' | 'dependencies' | 'devDependencies';

export function application(options: ApplicationSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      branchAndMerge(createNestApplication(options)),
      addPackageToJson(options, {name: 'husky', value: '~8.0.1'}),
      addNpmScript(options, {name: 'prepare', value: 'husky install'}),
      initProject(options),
    ])(tree, context);
  }
}

function createNestApplication(options: ApplicationSchema): Rule {
  return externalSchematic(
    '@nestjs/schematics',
    'application',
    {name: options.name},
  );
}

const sortObjectKeys = (o: { [x: string]: any; }): { [x: string]: any; } => (Object(o) !== o || Array.isArray(o)
  ? o
  : Object.keys(o).sort().reduce((a, k) => ({...a, [k]: sortObjectKeys(o[k])}), {}));

function ensurePackageSection(tree: Tree, name: string, section: PackageSection, entry: PackageEntry, sort: boolean = false) {
  const packageJsonPath = join(name, 'package.json');
  if (tree.exists(packageJsonPath)) {
    const sourceText = tree.read(packageJsonPath)!.toString('utf-8');
    const json = JSON.parse(sourceText) as any;

    if (!json[section]) {
      json[section] = {};
    }
    json[section][entry.name] = entry.value;

    if (sort) json[section] = sortObjectKeys(json[section]);

    tree.overwrite(packageJsonPath, JSON.stringify(json, null, 2));
  }
  return tree;
}

function addNpmScript(options: ApplicationSchema, script: PackageEntry) {
  return (host: Tree, _context: SchematicContext): Tree => {
    return ensurePackageSection(host, options.name, 'scripts', script);
  }
}

function addPackageToJson(options: ApplicationSchema, pkg: PackageEntry): Rule {
  return (host: Tree, _context: SchematicContext): Tree => {
    return ensurePackageSection(host, options.name, 'dependencies', pkg, true);
  }
}

function initProject(options: ApplicationSchema): Rule {
  return (host: Tree, context: SchematicContext): Tree => {
    const taskId = context.addTask(new RunSchematicTask('git-init', options));
    context.addTask(new RunSchematicTask('npm-install', options), [taskId]);
    return host;
  };
}
