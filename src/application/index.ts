import { Rule, SchematicContext, externalSchematic, Tree, branchAndMerge, chain } from '@angular-devkit/schematics';

import { NodePackageInstallTask, RepositoryInitializerTask } from '@angular-devkit/schematics/tasks';

// import { addPackageJsonDependency, NodeDependencyType } from 'schematics-utilities';
// import {
//   addPackageJsonDependency,
//   // NodeDependency,
//   NodeDependencyType,
// } from '@schematics/angular/utility/dependencies';

export function application(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {

    console.log('tree :>> ', options.path);
    return chain([
      branchAndMerge(createNestApplication(options)),


      // Ejecutar git init

      installPackageJsonDependencies(options.name)
    ])(tree, context);
  }
}

function addPackageToPackageJson(host: Tree, name: string, pkg: string, version: string): Tree {
  if (host.exists(`./${name}/package.json`)) {
    const sourceText = host.read(`./${name}/package.json`)!.toString("utf-8");
    const json = JSON.parse(sourceText) as any;
    if (!json.dependencies) {
      json.dependencies = {};
    }
    if (!json.dependencies[pkg]) {
      json.dependencies[pkg] = version;
      // json.dependencies = sortObjectByKeys(json.dependencies);
    }


    if (!json.scripts) {
      json.scripts = {};
    }
    if (!json.scripts.prepare) {
      const scriptName = "prepare";
      const scriptValue= "husky install";
      json.scripts[scriptName] = scriptValue;
    }

    host.overwrite(`./${name}/package.json`, JSON.stringify(json, null, 2));
  }
  return host;
}

function installPackageJsonDependencies(name: string): Rule {
  return (host: Tree, context: SchematicContext): Tree => {
    // const dependency =  { type: NodeDependencyType.Default, version: '~6.1.1', name: '@angular/elements' }
    const projectPath= `/${name}`
    // addPackageJsonDependency(host, dependency);

    addPackageToPackageJson(host, name, 'husky', '~8.0.1');


    context.addTask(new RepositoryInitializerTask(projectPath, {}));


    context.addTask(new NodePackageInstallTask(projectPath));
    return host;
  };
}

// function add(): Rule {
//   return (host: Tree, context: SchematicContext) => {
//     // The CLI inserts `@angular/cdk` into the `package.json` before this schematic runs. This
//     // means that we do not need to insert the CDK into `package.json` files again. In some cases
//     // though, it could happen that this schematic runs outside of the CLI `ng add` command, or
//     // the CDK is only listed as a dev dependency. If that is the case, we insert a version based
//     // on the current build version (substituted version placeholder).
//     if (getPackageVersionFromPackageJson(host, '@angular/cdk') === null) {
//       // In order to align the CDK version with other Angular dependencies that are setup by
//       // `@schematics/angular`, we use tilde instead of caret. This is default for Angular
//       // dependencies in new CLI projects.
//       addPackageToPackageJson(host, '@angular/cdk', `~0.0.0-PLACEHOLDER`);

//       // Add a task to run the package manager. This is necessary because we updated the
//       // workspace "package.json" file and we want lock files to reflect the new version range.
//       context.addTask(new NodePackageInstallTask());
//     }
//   };
// }

function createNestApplication(options: any): Rule {
  // if (!options.initApp) {
  //   return noop();
  // }
  return externalSchematic('@nestjs/schematics', 'application', options);
}
