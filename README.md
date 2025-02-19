# Bava-language

Bava Programming Language
Bava is a simple, imperative programming language built for educational and experimental purposes. It is designed to be easy to learn and use, while still supporting basic programming constructs like variables, loops, conditionals, and more.
Features
Simple Syntax: Designed to be easy to read and write
Integer Arithmetic: All numeric operations are performed with integers
Control Structures: Support for if statements and loops
Output: Print statements to display results
Web Playground: Available for online use at Bava Playground
Setup
Bava runs entirely in the browser using a web-based playground. No installation required!
Getting Started
Open the Bava Playground
Write your Bava code in the editor on the left
Click Run to see the output
Example code:
bavaCopy
hi_bava

bava_idhi x = 5;
bava_idhi y = 3;

ceppu_bava "The sum of x and y is " + (x + y);

bye_bava
Language Reference
Keywords
hi_bava: Marks the start of the program
bye_bava: Marks the end of the program
bava_idhi: Declare a variable (e.g., bava_idhi x = 10;)
ceppu_bava: Print output (e.g., ceppu_bava "Hello Bava!";)
inthavaraku: Loop while condition is true (e.g., inthavaraku x > 0 { ... })
aythey: If statement (e.g., aythey x == 10 { ... })
Operators
+, -, *, /, %: Arithmetic operations
==, !=, >, <, >=, <=: Comparison
=: Assignment
Variables
bavaCopy
bava_idhi variableName = initialValue;
Output
bavaCopy
ceppu_bava valueOrString;
Loops
bavaCopy
inthavaraku condition {
    // Block of code
}
Conditionals
bavaCopy
aythey condition {
    // Code to execute if true
} kakapote {
    // Code to execute if false
}
Examples
Hello World
bavaCopy
hi_bava
ceppu_bava "Hello, Bava!";
bye_bava
Fibonacci Sequence
bavaCopy
hi_bava

bava_idhi a = 0, b = 1;

ceppu_bava "Fibonacci sequence up to 10:";

inthavaraku a < 10 {
    ceppu_bava a;
    bava_idhi temp = a + b;
    a = b;
    b = temp;
}

bye_bava
Built-in Functions
ceppu_bava
Prints the specified value to the output panel.
Support
For questions or issues, contact the maintainers at support@bava-lang.org
Enjoy coding with Bava!
