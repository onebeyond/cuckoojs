import {
  apply,
  MergeStrategy,
  mergeWith,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';

export const main = (options: any): Rule => {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(`Creating CI`);

    const templateSource = apply(url(`./files/${options.ciProvider}`), [
      template({...options})
    ]);

    return mergeWith(templateSource, MergeStrategy.Overwrite)(tree, context);
  };
}