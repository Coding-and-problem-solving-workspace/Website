export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  cpp: "10.2.0",
  c: "10.2.0",
};

export const CODE_SNIPPETS = {
  javascript: `function greet() {\n\tconsole.log("Hello, World!");\n}\n\ngreet();`,
  typescript: `function greet(): void {\n\tconsole.log("Hello, World!");\n}\n\ngreet();`,
  python: `def greet():\n\tprint("Hello, World!")\n\ngreet()`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello, World!");\n\t\t}\n\t}\n}',
  php: "<?php\n\necho 'Hello, World!';",
  c: `#include <stdio.h>\n\nvoid greet() {\n\tprintf("Hello, World!\\n");\n}\n\nint main() {\n\tgreet();\n\treturn 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nvoid greet() {\n\tcout << "Hello, World!" << endl;\n}\n\nint main() {\n\tgreet();\n\treturn 0;\n}`,
};

export const FONT_SIZES = [
    6, 8, 10, 12, 14, 16, 18, 20, 22 
]