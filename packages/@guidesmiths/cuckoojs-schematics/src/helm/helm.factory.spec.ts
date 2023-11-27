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
  getBasicIngressTls,
} from './__fixtures__';

const collectionPath = path.join(__dirname, '../collection.json');

const cases = [
  {
    ingressType: 'generic',
    tlsCertType: 'no tls certificate manager',
    schemaOptions: {
      serviceName: 'serviceName',
      imageName: 'imageName',
      ingressController: 'generic',
      tlsCertManager: 'none',
    },
    expectedFiles: [
      '/package.json',
      '/.helm/.helmignore',
      '/.helm/Chart.yaml',
      '/.helm/values.yaml',
      '/.helm/templates/NOTES.txt',
      '/.helm/templates/_helpers.tpl',
      '/.helm/templates/deployment.yaml',
      '/.helm/templates/hpa.yaml',
      '/.helm/templates/secrets.yaml',
      '/.helm/templates/service.yaml',
      '/.helm/templates/serviceaccount.yaml',
      '/.helm/templates/ingress.yaml',
      '/.helm/templates/tests/test-connection.yaml',
    ],
    expectedValues: getBasicValues(),
    expectedIngress: getBasicIngress(),
  },
  {
    ingressType: 'generic',
    tlsCertType: 'cert-manager',
    schemaOptions: {
      serviceName: 'serviceName',
      imageName: 'imageName',
      ingressController: 'generic',
      tlsCertManager: 'cert-manager',
    },
    expectedFiles: [
      '/package.json',
      '/.helm/.helmignore',
      '/.helm/Chart.yaml',
      '/.helm/values.yaml',
      '/.helm/templates/NOTES.txt',
      '/.helm/templates/_helpers.tpl',
      '/.helm/templates/deployment.yaml',
      '/.helm/templates/hpa.yaml',
      '/.helm/templates/secrets.yaml',
      '/.helm/templates/service.yaml',
      '/.helm/templates/serviceaccount.yaml',
      '/.helm/templates/tls-certificate.yaml',
      '/.helm/templates/ingress.yaml',
      '/.helm/templates/tests/test-connection.yaml',
    ],
    expectedValues: getBasicValuesTls(),
    expectedIngress: getBasicIngressTls(),
  },
  {
    ingressType: 'traefik',
    tlsCertType: 'no tls certificate manager',
    schemaOptions: {
      serviceName: 'serviceName',
      imageName: 'imageName',
      ingressController: 'traefik',
      tlsCertManager: 'none',
    },
    expectedFiles: [
      '/package.json',
      '/.helm/.helmignore',
      '/.helm/Chart.yaml',
      '/.helm/values.yaml',
      '/.helm/templates/NOTES.txt',
      '/.helm/templates/_helpers.tpl',
      '/.helm/templates/deployment.yaml',
      '/.helm/templates/hpa.yaml',
      '/.helm/templates/secrets.yaml',
      '/.helm/templates/service.yaml',
      '/.helm/templates/serviceaccount.yaml',
      '/.helm/templates/ingress.yaml',
      '/.helm/templates/tests/test-connection.yaml',
    ],
    expectedValues: getTraefikValues(),
    expectedIngress: getTraefikIngress(),
  },
  {
    ingressType: 'traefik',
    tlsCertType: 'cert-manager',
    schemaOptions: {
      serviceName: 'serviceName',
      imageName: 'imageName',
      ingressController: 'traefik',
      tlsCertManager: 'cert-manager',
    },
    expectedFiles: [
      '/package.json',
      '/.helm/.helmignore',
      '/.helm/Chart.yaml',
      '/.helm/values.yaml',
      '/.helm/templates/NOTES.txt',
      '/.helm/templates/_helpers.tpl',
      '/.helm/templates/deployment.yaml',
      '/.helm/templates/hpa.yaml',
      '/.helm/templates/secrets.yaml',
      '/.helm/templates/service.yaml',
      '/.helm/templates/serviceaccount.yaml',
      '/.helm/templates/tls-certificate.yaml',
      '/.helm/templates/ingress.yaml',
      '/.helm/templates/tests/test-connection.yaml',
    ],
    expectedValues: getTraefikValues(),
    expectedIngress: getTraefikIngressTls(),
  },
];
describe('helm', () => {
  test.each(cases)(
    'works for helm with $ingressType ingress controller and $tlsCertType',
    async ({
      schemaOptions,
      expectedFiles,
      expectedValues,
      expectedIngress,
    }) => {
      const runner = new SchematicTestRunner('schematics', collectionPath);
      const folder = Tree.empty();
      folder.create('package.json', Buffer.from('{}'));
      const tree = await runner
        .runSchematicAsync('helm', schemaOptions, folder)
        .toPromise();

      expect(tree.files).toEqual(expectedFiles);

      const packageJson = JSON.parse(tree.readContent('./package.json'));
      expect(packageJson.scripts).toEqual({
        'helm:upgrade':
          'helm upgrade -f ./.helm/values.yml serviceName ./.helm',
      });

      const helmValues = tree.readContent('/.helm/values.yaml');
      expect(helmValues).toEqual(expectedValues);

      const ingress = tree.readContent('/.helm/templates/ingress.yaml');
      expect(ingress).toEqual(expectedIngress);
    },
  );
});
