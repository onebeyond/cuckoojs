
import * as ts from 'typescript';
import {insertImport} from '../../utils/ast-utils';

export function addImportsToFileChange(sourceText: string, path: string) {
	const sourceFile = ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true);

	const changesArr = [];

	changesArr.push(insertImport(sourceFile, path, 'ConfigModule', '@nestjs/config'));
	changesArr.push(insertImport(sourceFile, path, 'config', './config/config', true));
	changesArr.push(insertImport(sourceFile, path, 'validate', './config/env-validation', true));

	return changesArr;
}
