exports.assignLanguage = (lang) => {
  return constants[lang];
};

const constants = {
  javascript: {
    id: 63,
    name: "Javascript",
    version: "Node.js 12.14.0",
  },
  typescript: {
    id: 74,
    name: "Typescript",
    version: "3.7.4",
  },
  python: {
    id: 71,
    name: "Python",
    version: "3.8.1"
  },
  java: {
    id: 62,
    name: "Java",
    version: "OpenJDK 13.0.1"
  },
  cpp: {
    id: 53,
    name: "C++",
    version: "GCC 8.3.0"
  },
  c: {
    id: 49,
    name: "C",
    version: "GCC 8.3.0"
  },
};
