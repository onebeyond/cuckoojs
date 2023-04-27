import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('lambda-ci', () => {
    it('works with github', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const tree = await runner
            .runSchematicAsync('lambda-ci', {ciProvider: 'github', directory: 'any'}, Tree.empty())
            .toPromise();

        expect(tree.files).toEqual([
            '/any/.github/workflows/cicd-destroy-env.yml',
            '/any/.github/workflows/cicd-main-dev.yml',
            '/any/.github/workflows/cicd-main-prod.yml',
            '/any/.github/workflows/deploy-serverless-on-env.yml',
            '/any/.github/workflows/destroy-serverless-env.yml',
        ]);
    });
});
