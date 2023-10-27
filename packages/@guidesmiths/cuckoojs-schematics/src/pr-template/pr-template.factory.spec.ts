import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('pr-template', () => {
    it('works with github', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const tree = await runner
            .runSchematic('pr-template', {directory: 'somewhere', gitProvider: 'github'}, Tree.empty())

        expect(tree.files).toEqual([
            '/somewhere/.github/pull_request_template.md',
        ]);
    });
    it('works with azuredevops', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const tree = await runner
            .runSchematic('pr-template', {directory: 'somewhere', gitProvider: 'azuredevops'}, Tree.empty())

        expect(tree.files).toEqual([
            '/somewhere/.azuredevops/pull_request_template.md',
        ]);
    });
});
