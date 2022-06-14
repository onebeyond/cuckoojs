import { strings } from '@angular-devkit/core';
import { apply, mergeWith, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function init(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const sourceTemplates =  url('./files');
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ...options,
        ...strings
      })
    ]);

    return mergeWith(sourceParametrizedTemplates)(tree, context);
  };
}
