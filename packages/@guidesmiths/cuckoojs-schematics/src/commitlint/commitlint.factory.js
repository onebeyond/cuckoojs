"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function main(options) {
    return (tree, context) => {
        context.logger.info('Adding commitlint ...');
        const path = (0, core_1.normalize)(options.directory);
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.template)({}),
            (0, schematics_1.move)(path)
        ]);
        const merged = (0, schematics_1.mergeWith)(templateSource, schematics_1.MergeStrategy.Overwrite);
        return (0, schematics_1.chain)([
            merged,
            updatePackageJson(path)
        ])(tree, context);
    };
}
exports.main = main;
function updatePackageJson(directory) {
    return (tree, _context) => {
        const path = `${directory}/package.json`;
        const file = tree.read(path);
        const json = JSON.parse(file.toString());
        if (!json.devDependencies) {
            json.devDependencies = {};
        }
        json.devDependencies['@commitlint/cli'] = '^17.1.2';
        json.devDependencies['@commitlint/config-conventional'] = '^17.1.0';
        tree.overwrite(path, JSON.stringify(json, null, 2));
        return tree;
    };
}
//# sourceMappingURL=commitlint.factory.js.map