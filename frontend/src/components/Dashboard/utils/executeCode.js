import axios from "axios";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, version, sourceCode, input) => {
  console.log(input);
  const resp = await API.post("/execute", {
    language: language,
    version: version,
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: input,
    // args: ["1", "2", "3"],
    compile_timeout: 10000,
    run_timeout: 3000,
    compile_memory_limit: -1,
    run_memory_limit: -1,
  });

  return resp.data;
};
