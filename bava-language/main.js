const { lexer } = require("./lexer");
const { parser } = require("./parser");
const { interpreter } = require("./interpreter");

const input = `
hi_bava
bava_idhi rows = 5;
bava_idhi i = 1;
inthavaraku i <= rows {
    bava_idhi j = 1;
    bava_idhi stars = "";
    inthavaraku j <= i {
        stars = stars + "*";
        j = j + 1;
    }
    ceppu_bava stars;
    i = i + 1;
}
bye_bava
`;

try {
  const tokens = lexer(input);
  console.log("\nTokens:", tokens.map(token => JSON.stringify(token)));

  const ast = parser(tokens);
  console.log("\nAST:", JSON.stringify(ast, null, 2));

  interpreter(ast);
} catch (e) {
  console.error("\nError:", e);
}