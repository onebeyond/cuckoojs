import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('pr-template', () => {
    it('works with github', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const tree = await runner
            .runSchematicAsync('pr-template', {gitProvider: 'github'}, Tree.empty())
            .toPromise();

        expect(tree.files).toEqual([
            '/.github/pull_request_template.md',
        ]);
    });
    it('works with azuredevops', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const tree = await runner
            .runSchematicAsync('pr-template', {gitProvider: 'azuredevops'}, Tree.empty())
            .toPromise();

        expect(tree.files).toEqual([
            '/.azuredevops/pull_request_template.md',
        ]);
    });
});
