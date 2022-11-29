import {Tree} from '@angular-devkit/schematics';
import {SchematicTestRunner} from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('lambda-quickstart', () => {
    it('works', async () => {
        const runner = new SchematicTestRunner('schematics', collectionPath);
        const tree = await runner
            .runSchematicAsync('lambda-quickstart', {directory: 'some-folder', serviceName: 'anyName'}, Tree.empty())
            .toPromise();

        expect(tree.files).toEqual([
            "/some-folder/README.md",
            "/some-folder/jest.config.js",
            "/some-folder/package.json",
            "/some-folder/serverless.yml",
            "/some-folder/.nvmrc",
            "/some-folder/.env.sample",
            "/some-folder/docker/docker-compose.yml",
            "/some-folder/docker/localstack/custom-config.sh",
            "/some-folder/fixtures/hello/regularRequest.json",
            "/some-folder/src/components/container.js",
            "/some-folder/src/components/config/config.js",
            "/some-folder/src/components/controllers/helloController.js",
            "/some-folder/src/components/controllers/tests/helloController.test.js",
            "/some-folder/src/components/controllers/tests/mocks/logger.js",
            "/some-folder/src/components/logger/logger.js",
            "/some-folder/src/handlers/hello.js",
            "/some-folder/src/handlers/schemas/helloInput.js",
            "/some-folder/src/handlers/utils/extractPayload.js",
            "/some-folder/src/handlers/utils/httpResponse.js"
        ]);
    });
});
