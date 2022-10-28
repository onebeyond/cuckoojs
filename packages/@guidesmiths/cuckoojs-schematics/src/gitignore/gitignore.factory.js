"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function main(options) {
    return (tree, context) => {
        context.logger.info('Creating .gitignore file');
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.template)({}),
            (0, schematics_1.move)((0, core_1.normalize)(options.directory))
        ]);
        return (0, schematics_1.mergeWith)(templateSource, schematics_1.MergeStrategy.Overwrite)(tree, context);
    };
}
exports.main = main;
//# sourceMappingURL=gitignore.factory.js.map