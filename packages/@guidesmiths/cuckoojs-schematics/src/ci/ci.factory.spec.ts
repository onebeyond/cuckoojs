import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('ci', () => {
  it('works with github', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync(
        'ci',
        {
          ciProvider: 'github',
          dockerRegistry: 'dockerRegistry',
          imageName: 'imageName',
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toEqual(['/.github/workflows/ci-docker-build-push.yml']);
  });
  it('works with azuredevops', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync(
        'ci',
        {
          ciProvider: 'azuredevops',
          dockerRegistry: 'dockerRegistry',
          imageName: 'imageName',
        },
        Tree.empty(),
      )
      .toPromise();

    expect(tree.files).toEqual(['/azure-pipelines.yml']);
  });
});
