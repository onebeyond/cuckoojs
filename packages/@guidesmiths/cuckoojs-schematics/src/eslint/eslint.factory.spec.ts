import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('eslint', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const folder = Tree.empty();
    folder.create('package.json', Buffer.from('{}'));
    const tree = await runner
      .runSchematicAsync('eslint', { directory: '.' }, folder)
      .toPromise();

    expect(tree.files).toEqual(['/package.json', '/.eslintrc.js']);

    const actualPackageJson = JSON.parse(
      tree.readContent('./package.json'),
    ) as Record<string, string>;
    expect(actualPackageJson.devDependencies).toEqual({
      eslint: '^8.29.0',
      'eslint-config-airbnb-base': '^15.0.0',
      'eslint-plugin-import': '^2.26.0',
      'eslint-plugin-jest': '^27.1.6',
    });
    expect(actualPackageJson.scripts).toEqual({
      lint: 'eslint .',
      'lint:fix': 'eslint . --fix',
    });
  });
});
