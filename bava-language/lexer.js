// lexer.js
const keywords = [
  "hi_bava", "bye_bava", "bava_idhi", "ceppu_bava", "aythey", "kakapote", 
  "inthavaraku", "apandi", "konasagu", "nijam", "tappu", "khali"
];

const operators = ["==", "!=", "<=", ">=", "=", ">", "<", "+", "-", "*", "/","%"];
const punctuation = [";", "{", "}", "(", ")", "\n"];

function lexer(input) {
  const tokens = [];
  let current = 0;

  while (current < input.length) {
    const char = input[current];

    if (/\s/.test(char)) {
      current++;
      continue;
    }

    // Check for multi-character operators first
    if (current + 1 < input.length) {
      const doubleChar = char + input[current + 1];
      if (operators.includes(doubleChar)) {
        tokens.push({ type: 'OPERATOR', value: doubleChar });
        current += 2;
        continue;
      }
    }

    // Check for single-character operators
    if (operators.includes(char)) {
      tokens.push({ type: 'OPERATOR', value: char });
      current++;
      continue;
    }

    if (/[a-zA-Z_]/.test(char)) {
      let value = "";
      while (/[a-zA-Z_]/.test(input[current])) {
        value += input[current];
        current++;
      }
      if (keywords.includes(value)) {
        tokens.push({ type: 'KEYWORD', value });
      } else {
        tokens.push({ type: 'IDENTIFIER', value });
      }
      continue;
    }

    if (/\d/.test(char)) {
      let value = "";
      while (/\d/.test(input[current])) {
        value += input[current];
        current++;
      }
      tokens.push({ type: 'NUMBER', value });
      continue;
    }

    if (char === '"') {
      let value = "";
      current++;
      while (current < input.length && input[current] !== '"') {
        value += input[current];
        current++;
      }
      current++;
      tokens.push({ type: 'STRING', value });
      continue;
    }

    if (punctuation.includes(char)) {
      tokens.push({ type: 'PUNCTUATION', value: char });
      current++;
      continue;
    }

    throw new Error(`bava emi cestunnav: Unknown character: ${char}`);
  }

  return tokens;
}

module.exports = { lexer };