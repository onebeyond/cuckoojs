import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('nestjs-config', () => {
    it('works', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const tree = await runner
            .runSchematicAsync('nestjs-config', {directory: '.'}, Tree.empty())
            .toPromise();

        expect(tree.files).toEqual([
            '/src/config/config.ts',
        ]);
    });
});
