
import * as ts from 'typescript';
import {insertImport} from '@schematics/angular/utility/ast-utils';

export function addImportsToFileChange(sourceText: string, path: string): any[] {
	const sourceFile = ts.createSourceFile(path, sourceText, ts.ScriptTarget.Latest, true);

	const changesArr = [];

	changesArr.push(insertImport(sourceFile as any, path, 'ConfigModule', '@nestjs/config'));
	changesArr.push(insertImport(sourceFile as any, path, 'config, { validate }', './config/config', true));

	return changesArr;
}
