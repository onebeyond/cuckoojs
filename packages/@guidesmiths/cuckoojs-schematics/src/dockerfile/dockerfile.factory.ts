import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  template,
  url,
} from '@angular-devkit/schematics';
import { normalize } from '@angular-devkit/core';
import { resolve } from 'path';

interface Options {
  directory: string;
  buildType: string;
  nodeVersion: string;
}

export function main(options: Options): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info('Creating Dockerfile...');

    const templateSourceDockerfile = apply(
      url(resolve('.', 'files', options.buildType)),
      [template({ ...options })],
    );
    const mergedDockerfile = mergeWith(
      templateSourceDockerfile,
      MergeStrategy.Overwrite,
    );

    const templateSourceDockerignore = apply(
      url(resolve('.', 'files', 'common')),
      [template({ ...options })],
    );
    const mergedDockerignore = mergeWith(
      templateSourceDockerignore,
      MergeStrategy.Overwrite,
    );

    return chain([
      mergedDockerfile,
      mergedDockerignore,
      renameDockerignore(options),
    ]);
  };
}

function renameDockerignore(options: Options): Rule {
  return (tree: Tree) => {
    const normalizedPath = normalize(options.directory);
    tree.rename(
      resolve(normalizedPath, 'dockerignore'),
      resolve(normalizedPath, '.dockerignore'),
    );
    return tree;
  };
}
