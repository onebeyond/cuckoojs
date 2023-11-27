import {
  type Rule,
  SchematicsException,
  type Tree,
} from '@angular-devkit/schematics';
import { InsertChange } from '../../utils/change';
import { addConfigToModuleChange } from './add-config-to-module-change';
import { addImportsToFileChange } from './add-imports-to-file-change';

export function addConfigToModuleRule(path: string): Rule {
  return (tree: Tree) => {
    const sourceText = tree.readText(path);
    if (!sourceText) {
      throw new SchematicsException('File does not exist.');
    }

    const importsChanges = addImportsToFileChange(sourceText, path);
    const moduleChange = addConfigToModuleChange(sourceText, path);

    const declarationRecorder = tree.beginUpdate(path);

    for (const change of importsChanges) {
      if (change instanceof InsertChange) {
        declarationRecorder.insertLeft(change.pos, change.toAdd);
      }
    }

    declarationRecorder.insertLeft(moduleChange.pos, moduleChange.toAdd);
    tree.commitUpdate(declarationRecorder);

    return tree;
  };
}
