import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('helm', () => {
    it('works', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const tree = await runner.runSchematic('helm', {serviceName: 'serviceName', imageName: 'imageName'}, Tree.empty())

        expect(tree.files).toEqual([
            '/.helm/.helmignore',
            '/.helm/Chart.yaml',
            '/.helm/values.yaml',
            '/.helm/templates/NOTES.txt',
            '/.helm/templates/_helpers.tpl',
            '/.helm/templates/deployment.yaml',
            '/.helm/templates/hpa.yaml',
            '/.helm/templates/ingress.yaml',
            '/.helm/templates/service.yaml',
            '/.helm/templates/serviceaccount.yaml',
            '/.helm/templates/tests/test-connection.yaml'
        ]);
    });
});
