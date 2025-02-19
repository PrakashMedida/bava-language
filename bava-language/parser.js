function parser(tokens) {
  let current = 0;

  function parseProgram() {
    const ast = [];
    while (current < tokens.length) {
      const token = tokens[current];
      if (token.type === 'KEYWORD') {
        switch (token.value) {
          case 'hi_bava':
          case 'bye_bava':
            current++;
            break;
          case 'bava_idhi':
            ast.push(parseVariableDeclaration());
            break;
          case 'ceppu_bava':
            ast.push(parseOutput());
            break;
          case 'aythey':
            ast.push(parseIfStatement());
            break;
          case 'inthavaraku':
            ast.push(parseLoop());
            break;
          default:
            throw new Error(`Unexpected keyword: ${token.value}`);
        }
      } else {
        throw new Error(`Unexpected token: ${JSON.stringify(token)}`);
      }
    }
    return ast;
  }

  function parseVariableDeclaration() {
    current++; // Skip 'bava_idhi'
    const identifier = tokens[current++].value;
    if (tokens[current].value !== '=') {
      throw new Error(`Expected '=' after identifier`);
    }
    current++;
    const value = parseExpression();
    if (tokens[current].value !== ';') {
      throw new Error(`Expected ';' after value`);
    }
    current++;
    return {
      type: 'VariableDeclaration',
      identifier,
      value
    };
  }

  function parseAssignment() {
    const identifier = tokens[current].value;
    current++; // Consume identifier
    if (tokens[current].value !== '=') {
      throw new Error("Expected '=' in assignment");
    }
    current++;
    const value = parseExpression();
    if (tokens[current].value !== ';') {
      throw new Error("Expected ';' after assignment");
    }
    current++;
    return {
      type: 'Assignment',
      identifier,
      value
    };
  }

  function parseOutput() {
    current++; // Skip 'ceppu_bava'
    const value = parseExpression();
    if (tokens[current].value !== ';') {
      throw new Error(`Expected ';' after value`);
    }
    current++;
    return {
      type: 'Output',
      value
    };
  }

  function parseIfStatement() {
    current++; // Skip 'aythey'
    const condition = parseExpression();
    if (tokens[current].value !== '{') {
      throw new Error(`Expected '{' after condition`);
    }
    current++;
    const ifBlock = parseBlock();
    if (tokens[current].value !== '}') {
      throw new Error(`Expected '}' after if block`);
    }
    current++;
    let elseBlock = [];
    if (tokens[current]?.value === 'kakapote') {
      current++; // Skip 'kakapote'
      if (tokens[current].value !== '{') {
        throw new Error(`Expected '{' after kakapote`);
      }
      current++;
      elseBlock = parseBlock();
      if (tokens[current].value !== '}') {
        throw new Error(`Expected '}' after else block`);
      }
      current++;
    }
    return {
      type: 'IfStatement',
      condition,
      ifBlock,
      elseBlock
    };
  }

  function parseLoop() {
    current++; // Skip 'inthavaraku'
    const condition = parseExpression();
    if (tokens[current].value !== '{') {
      throw new Error(`Expected '{' after condition`);
    }
    current++;
    const loopBlock = parseBlock();
    if (tokens[current].value !== '}') {
      throw new Error(`Expected '}' after loop block`);
    }
    current++;
    return {
      type: 'Loop',
      condition,
      loopBlock
    };
  }

  function parseBlock() {
    const block = [];
    while (tokens[current].value !== '}') {
      block.push(parseStatement());
    }
    return block;
  }

  function parseStatement() {
    const token = tokens[current];
    if (token.type === 'KEYWORD') {
      switch (token.value) {
        case 'bava_idhi':
          return parseVariableDeclaration();
        case 'ceppu_bava':
          return parseOutput();
        case 'aythey':
          return parseIfStatement();
        case 'inthavaraku':
          return parseLoop();
        default:
          throw new Error(`Unexpected keyword: ${token.value}`);
      }
    } else if (token.type === 'IDENTIFIER') {
      return parseAssignment();
    } else {
      throw new Error(`Unexpected token: ${JSON.stringify(token)}`);
    }
  }

  function parseExpression() {
    return parseEquality();
  }

  function parseEquality() {
    let expr = parseRelational();
    while (current < tokens.length && tokens[current].type === 'OPERATOR' && ['==', '!='].includes(tokens[current].value)) {
      const operator = tokens[current].value;
      current++;
      const right = parseRelational();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right: right
      };
    }
    return expr;
  }

  function parseRelational() {
    let expr = parseAdditive();
    while (current < tokens.length && tokens[current].type === 'OPERATOR' && ['<', '>', '<=', '>='].includes(tokens[current].value)) {
      const operator = tokens[current].value;
      current++;
      const right = parseAdditive();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right: right
      };
    }
    return expr;
  }

  function parseAdditive() {
    let expr = parseMultiplicative();
    while (current < tokens.length && tokens[current].type === 'OPERATOR' && ['+', '-'].includes(tokens[current].value)) {
      const operator = tokens[current].value;
      current++;
      const right = parseMultiplicative();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right: right
      };
    }
    return expr;
  }

  function parseMultiplicative() {
    let expr = parsePrimary();
    while (current < tokens.length && tokens[current].type === 'OPERATOR' && ['*', '/', '%'].includes(tokens[current].value)) {
      const operator = tokens[current].value;
      current++;
      const right = parsePrimary();
      expr = {
        type: 'BinaryExpression',
        operator,
        left: expr,
        right: right
      };
    }
    return expr;
  }

  function parsePrimary() {
    if (tokens[current].value === "(") {
      current++;
      const expression = parseExpression();
      if (tokens[current].value !== ")") {
        throw new Error("Expected ')'");
      }
      current++;
      return expression;
    }
    const token = tokens[current++];
    if (token.type === 'NUMBER') {
      return { type: 'Literal', value: Number(token.value) };
    } else if (token.type === 'STRING') {
      return { type: 'Literal', value: token.value };
    } else if (token.type === 'IDENTIFIER') {
      return { type: 'Identifier', value: token.value };
    }
    throw new Error('Expected number, identifier, or string');
  }

  return parseProgram();
}

module.exports = { parser };