import {
  apply,
  MergeStrategy,
  mergeWith, move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import {normalize} from "@angular-devkit/core";

export const main = (options: any): Rule => {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(`Creating Lambda CI`);

    const templateSource = apply(url(`./files/${options.ciProvider}`), [
      template({...options}),
      move(normalize(options.directory)),
    ]);

    return mergeWith(templateSource, MergeStrategy.Overwrite)(tree, context);
  };
}
