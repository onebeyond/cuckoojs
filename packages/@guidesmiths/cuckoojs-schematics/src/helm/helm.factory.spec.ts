import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { 
    getBasicValues, 
    getBasicIngress, 
    getTraefikValues, 
    getTraefikIngress, 
    getBasicValuesTls, 
    getTraefikIngressTls,
} from './__fixtures__';

const collectionPath = path.join(__dirname, '../collection.json');

describe('helm', () => {
    it('works for helm with generic ingress controller and no tls certificate manager', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const folder = Tree.empty();
        folder.create('package.json',Buffer.from('{}'));
        const tree = await runner
            .runSchematicAsync('helm',
                { 
                    serviceName: 'serviceName', 
                    imageName: 'imageName', 
                    ingressController: 'generic', 
                    tlsCertManager: 'none'
                },
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
            "/.helm/templates/secrets.yaml",
            '/.helm/templates/service.yaml',
            '/.helm/templates/serviceaccount.yaml',
            '/.helm/templates/ingress.yaml',
            '/.helm/templates/tests/test-connection.yaml',
        ]);

        const packageJson = JSON.parse(tree.readContent('./package.json'));
        expect(packageJson.scripts).toEqual({
            "helm:upgrade": "helm upgrade -f ./.helm/values.yml serviceName ./.helm"
        });

        const helmValues = tree.readContent('/.helm/values.yaml');
        expect(helmValues).toEqual(getBasicValues());

        const ingress = tree.readContent('/.helm/templates/ingress.yaml');
        expect(ingress).toEqual(getBasicIngress());
    });

    it('works for helm with generic ingress controller and cert-manager', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const folder = Tree.empty();
        folder.create('package.json',Buffer.from('{}'));
        const tree = await runner
            .runSchematicAsync('helm',
                { 
                    serviceName: 'serviceName', 
                    imageName: 'imageName', 
                    ingressController: 'generic', 
                    tlsCertManager: 'certManager'
                },
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
            "/.helm/templates/secrets.yaml",
            '/.helm/templates/service.yaml',
            '/.helm/templates/serviceaccount.yaml',
            "/.helm/templates/tls-certificate.yaml",
            '/.helm/templates/ingress.yaml',
            '/.helm/templates/tests/test-connection.yaml',
        ]);

        const packageJson = JSON.parse(tree.readContent('./package.json'));
        expect(packageJson.scripts).toEqual({
            "helm:upgrade": "helm upgrade -f ./.helm/values.yml serviceName ./.helm"
        });

        const helmValues = tree.readContent('./.helm/values.yaml');
        expect(helmValues).toEqual(getBasicValuesTls());
    });

    it('works for helm with traefik and no tls certificate manager', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const folder = Tree.empty();
        folder.create('package.json',Buffer.from('{}'));
        const tree = await runner
            .runSchematicAsync('helm',
                { 
                    serviceName: 'serviceName', 
                    imageName: 'imageName', 
                    ingressController: 'traefik', 
                    tlsCertManager: 'none'
                },
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
            "/.helm/templates/secrets.yaml",
            '/.helm/templates/service.yaml',
            '/.helm/templates/serviceaccount.yaml',
            '/.helm/templates/ingress.yaml',
            '/.helm/templates/tests/test-connection.yaml',
        ]);

        const packageJson = JSON.parse(tree.readContent('./package.json'));
        expect(packageJson.scripts).toEqual({
            "helm:upgrade": "helm upgrade -f ./.helm/values.yml serviceName ./.helm"
        });

        const helmValues = tree.readContent('./.helm/values.yaml');
        expect(helmValues).toEqual(getTraefikValues());

        const ingress = tree.readContent('./.helm/templates/ingress.yaml');
        expect(ingress).toEqual(getTraefikIngress());
    });

    it('works for helm with traefik and cert-manager', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const folder = Tree.empty();
        folder.create('package.json',Buffer.from('{}'));
        const tree = await runner
            .runSchematicAsync('helm',
                { 
                    serviceName: 'serviceName', 
                    imageName: 'imageName', 
                    ingressController: 'traefik',
                    tlsCertManager: 'certManager'
                },
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
            "/.helm/templates/secrets.yaml",
            '/.helm/templates/service.yaml',
            '/.helm/templates/serviceaccount.yaml',
            "/.helm/templates/tls-certificate.yaml",
            '/.helm/templates/ingress.yaml',
            '/.helm/templates/tests/test-connection.yaml',
        ]);

        const packageJson = JSON.parse(tree.readContent('./package.json'));
        expect(packageJson.scripts).toEqual({
            "helm:upgrade": "helm upgrade -f ./.helm/values.yml serviceName ./.helm"
        });

        const helmValues = tree.readContent('./.helm/values.yaml');
        expect(helmValues).toEqual(getTraefikValues());

        const ingress = tree.readContent('./.helm/templates/ingress.yaml');
        expect(ingress).toEqual(getTraefikIngressTls());
    });
});
