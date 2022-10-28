import {
  apply,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { normalize } from "@angular-devkit/core";

export function main(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Creating .gitignore file');

    const templateSource = apply(url('./files'), [
      template({}),
      move(normalize(options.directory))
    ]);

    return mergeWith(templateSource, MergeStrategy.Overwrite)(tree, context);
  };
}
