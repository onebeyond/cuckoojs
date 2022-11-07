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
      move(normalize(options.directory)),
      renameFile(options),
    ]);

    return mergeWith(templateSource, MergeStrategy.Overwrite)(tree, context);
  };
}

function renameFile(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const normalizedPath = normalize(options.directory);
    tree.rename(`${normalizedPath}/gitignore`, `${normalizedPath}/.gitignore`);
    return tree;
  };
}