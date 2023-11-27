import * as ts from 'typescript';
import { getSourceNodes, findNode, findNodes } from '../../utils/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { SchematicsException } from '@angular-devkit/schematics';

// eslint-disable-next-line @typescript-eslint/naming-convention
const IMPORT_DECLARATION = `
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validate,
    }),`;

function getModuleDecoratorNode(nodes: ts.Node[]) {
  const decoratorNodes = nodes.filter(
    (n) => n.kind === ts.SyntaxKind.Decorator,
  );
  const moduleDecoratorNodes: ts.Node[] = decoratorNodes?.filter((n) =>
    findNode(n, ts.SyntaxKind.Identifier, 'Module'),
  );

  if (moduleDecoratorNodes.length === 0) {
    throw new SchematicsException('No Module decorators found');
  }

  if (moduleDecoratorNodes.length > 1) {
    throw new SchematicsException('More than one Module decorator found');
  }

  return moduleDecoratorNodes[0] as ts.Decorator;
}

function getDecoratorArgument(node: ts.Decorator) {
  const objectLiteralExpressionNodes =
    findNodes(node, ts.SyntaxKind.ObjectLiteralExpression) || [];
  if (objectLiteralExpressionNodes.length !== 1) {
    throw new SchematicsException('Invalid Module decorator arguments');
  }

  return objectLiteralExpressionNodes[0] as unknown as ts.ObjectLiteralExpression;
}

function isImportIdentifier(node: ts.Node) {
  return node.kind === ts.SyntaxKind.Identifier && node.getText() === 'imports';
}

function getImportsNode(nodes: ts.NodeArray<ts.ObjectLiteralElementLike>) {
  return nodes.find((n) =>
    n.getChildren().find(isImportIdentifier),
  ) as ts.PropertyAssignment;
}

function createAddToImportsChange(path: string, node: ts.PropertyAssignment) {
  const arrayLiteralNode = node
    .getChildren()
    .find((n) => n.kind === ts.SyntaxKind.ArrayLiteralExpression);
  const importsListNode = arrayLiteralNode
    ?.getChildren()
    .find((n) => n.kind === ts.SyntaxKind.SyntaxList);

  if (!importsListNode) {
    throw new SchematicsException('No imports list found');
  }

  return new InsertChange(
    path,
    importsListNode.getEnd() ?? 0,
    IMPORT_DECLARATION,
  );
}

function createImportsChange(path: string, node: ts.Node) {
  const importToInsert = `
  imports: [${IMPORT_DECLARATION}
  ],`;
  const insertPosition = findNodes(node, ts.SyntaxKind.OpenBraceToken)[0].end;
  return new InsertChange(path, insertPosition, importToInsert);
}

export function addConfigToModuleChange(
  sourceText: string,
  path: string,
): InsertChange {
  const sourceFile = ts.createSourceFile(
    path,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
  );
  const nodes = getSourceNodes(sourceFile);

  const moduleDecoratorNode = getModuleDecoratorNode(nodes);
  const decoratorArgument = getDecoratorArgument(moduleDecoratorNode);
  const importsPropertyNode = getImportsNode(decoratorArgument.properties);

  let importChange;
  if (importsPropertyNode) {
    importChange = createAddToImportsChange(path, importsPropertyNode);
  } else {
    importChange = createImportsChange(path, decoratorArgument);
  }

  return importChange;
}
