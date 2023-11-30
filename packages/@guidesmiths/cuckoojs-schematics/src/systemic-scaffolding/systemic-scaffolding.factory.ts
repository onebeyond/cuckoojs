import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  apply,
  MergeStrategy,
  mergeWith,
  move,
  template,
  url,
} from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';

interface Options {
  directory: string;
}

export function main(options: Options): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info('Creating Systemic scaffolding...');

    const templateSource = apply(url(normalize('./files')), [
      template({ ...options }),
      move(normalize(options.directory)),
    ]);

    return mergeWith(templateSource, MergeStrategy.Overwrite);
  };
}
