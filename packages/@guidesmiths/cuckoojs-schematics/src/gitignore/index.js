"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const schematics_1 = require("@angular-devkit/schematics");
function run(_options) {
    return (tree, context) => {
        context.logger.info('Creating .gitignore file');
        const templates = (0, schematics_1.url)('./files');
        const templateSource = (0, schematics_1.apply)(templates, [
            (0, schematics_1.template)({})
        ]);
        return (0, schematics_1.mergeWith)(templateSource, schematics_1.MergeStrategy.Overwrite)(tree, context);
    };
}
exports.run = run;
//# sourceMappingURL=index.js.map