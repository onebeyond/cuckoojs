import { Rule, SchematicContext, externalSchematic, Tree, branchAndMerge, chain } from '@angular-devkit/schematics';

import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
// export function application(options: any): Rule {
//   return (tree: Tree, context: SchematicContext) => {
//     console.log('Run application generator');

//     const sourceTemplates =  url('./files');
//     const sourceParametrizedTemplates = apply(sourceTemplates, [
//       template({
//         ...options,
//         ...strings
//       })
//     ]);

//     return mergeWith(sourceParametrizedTemplates)(tree, context);
//   };
// }

// export function application(options: any): Rule {
//   return (tree: Tree, context: SchematicContext) => {
//     return branchAndMerge(
//       chain([
//         createNestApplication(options),
//         installHusky(options),
//       ]),
//     )(tree, context);
//   };
// }

export function application(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // const projectPath= "/home/path/to/project"
    // const templateSource = apply(url(templatePath), [move(projectPath)]);
    // context.addTask(new NodePackageInstallTask(projectPath));

    installHusky(options);
    return chain([branchAndMerge(createNestApplication(options))])(tree, context);
  }
}

function installHusky(_options: any): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
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