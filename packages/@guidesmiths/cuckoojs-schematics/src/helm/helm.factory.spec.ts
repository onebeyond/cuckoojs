import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { getGenericValues, getObValues } from './__fixtures__';

const collectionPath = path.join(__dirname, '../collection.json');

describe('helm', () => {
    it('works for helmType generic', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const folder = Tree.empty();
        folder.create('package.json',Buffer.from('{}'));
        const tree = await runner
            .runSchematicAsync('helm',
                { helmType: 'generic', serviceName: 'serviceName', imageName: 'imageName'},
                folder
            ).toPromise();

        expect(tree.files).toEqual([
            "/package.json",
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
            '/.helm/templates/tests/test-connection.yaml',
        ]);

        const packageJson = JSON.parse(tree.readContent('./package.json'));
        expect(packageJson.scripts).toEqual({
            "helm:upgrade": "helm upgrade -f ./.helm/values.yml serviceName ./.helm"
        });

        const helmValues = tree.readContent('./.helm/values.yaml');
        expect(helmValues).toEqual(getGenericValues());
    });

    it('works for helmType ob (One Beyond)', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const folder = Tree.empty();
        folder.create('package.json',Buffer.from('{}'));
        const tree = await runner
            .runSchematicAsync('helm',
                { helmType: 'ob', serviceName: 'serviceName', imageName: 'imageName'},
                folder
            ).toPromise();

        expect(tree.files).toEqual([
            '/package.json',
            '/.helm/values.yaml',
        ]);

        const packageJson = JSON.parse(tree.readContent('./package.json'));
        expect(packageJson.scripts).toEqual({
            "helm:upgrade": "helm upgrade -f ./.helm/values.yml serviceName onebeyond/one-beyond-service:0.1.9"
        });

        const helmValues = tree.readContent('./.helm/values.yaml');
        expect(helmValues).toEqual(getObValues());
    });
});
