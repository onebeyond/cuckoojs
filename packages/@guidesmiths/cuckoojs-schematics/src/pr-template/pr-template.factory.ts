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
import { resolve } from 'path';

interface Options {
  directory: string;
  gitProvider: string;
}

export function main(options: Options): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info('Creating Pull Request Template...');

    const templateSource = apply(url(resolve('.', 'files')), [
      template({ ...options }),
      move(normalize(options.directory)),
    ]);

    return mergeWith(templateSource, MergeStrategy.Overwrite);
  };
}
