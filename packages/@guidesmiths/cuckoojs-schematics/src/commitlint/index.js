"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function run(_options) {
    return (tree, context) => {
        const templates = (0, schematics_1.url)('./files');
        const templateSource = (0, schematics_1.apply)(templates, [
            (0, schematics_1.template)({})
        ]);
        const merged = (0, schematics_1.mergeWith)(templateSource, schematics_1.MergeStrategy.Overwrite);
        const rule = (0, schematics_1.chain)([
            merged,
            updatePackageJson()
        ]);
        return rule(tree, context);
    };
}
exports.run = run;
function updatePackageJson() {
    return (tree, _context) => {
        // const path = `/${name}/package.json`;
        const path = 'package.json';
        const file = tree.read(path);
        const json = JSON.parse(file.toString());
        if (!json.devDependencies) {
            json.devDependencies = {};
        }
        json.devDependencies.commitlint = '^17.1.2';
        tree.overwrite(path, JSON.stringify(json, null, 2));
        return tree;
    };
}
//# sourceMappingURL=index.js.map