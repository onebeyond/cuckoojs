import {Tree} from '@angular-devkit/schematics';
import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('git-init', () => {
	it('works', async () => {
		const runner = new SchematicTestRunner('schematics', collectionPath);
		const tree = await runner
			.runSchematicAsync('git-init', {}, Tree.empty())
			.toPromise();

		expect(tree.files).toEqual([]);
	});
});
