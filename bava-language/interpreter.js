function interpreter(ast) {
  const environment = {};

  function executeNode(node) {
    switch (node.type) {
      case 'VariableDeclaration':
        const value = evaluateExpression(node.value);
        environment[node.identifier] = value;
        break;
      case 'Assignment':
        const assignedValue = evaluateExpression(node.value);
        environment[node.identifier] = assignedValue;
        break;
      case 'Output':
        const outputValue = evaluateExpression(node.value);
        console.log(outputValue);
        break;
      case 'IfStatement':
        const conditionValue = evaluateExpression(node.condition);
        if (conditionValue) {
          node.ifBlock.forEach(childNode => executeNode(childNode));
        } else if (node.elseBlock.length > 0) {
          node.elseBlock.forEach(childNode => executeNode(childNode));
        }
        break;
      case 'Loop':
        while (true) {
          const loopCondition = evaluateExpression(node.condition);
          if (!loopCondition) break;
          node.loopBlock.forEach(childNode => executeNode(childNode));
        }
        break;
    }
  }

  function evaluateExpression(expr) {
    switch (expr.type) {
      case 'Literal':
        return expr.value;
      case 'Identifier':
        if (!(expr.value in environment)) {
          throw new Error(`Undefined variable: ${expr.value}`);
        }
        return environment[expr.value];
      case 'BinaryExpression':
        const left = evaluateExpression(expr.left);
        const right = evaluateExpression(expr.right);
        switch (expr.operator) {
          case '+': return left + right;
          case '-': return left - right;
          case '*': return left * right;
          case '/': return left / right;
          case '%': return left % right;
          case '==': return left == right;
          case '!=': return left != right;
          case '<': return left < right;
          case '<=': return left <= right;
          case '>': return left > right;
          case '>=': return left >= right;
        }
        return null; // Should not reach here
      default:
        throw new Error(`Unknown expression type: ${expr.type}`);
    }
  }

  ast.forEach(node => {
    executeNode(node);
  });
}

module.exports = { interpreter };