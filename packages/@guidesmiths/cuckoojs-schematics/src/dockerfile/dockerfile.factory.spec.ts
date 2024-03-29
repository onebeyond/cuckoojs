import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('dockerignore', () => {
  it('works with node basic build', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync(
        'dockerfile',
        { directory: '.', buildType: 'basic', nodeVersion: 18 },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toEqual(['/Dockerfile', '/.dockerignore']);
  });
  it('works with nestjs build', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync(
        'dockerfile',
        { directory: '.', buildType: 'nestjs', nodeVersion: 18 },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toEqual(['/Dockerfile', '/.dockerignore']);
  });
});
