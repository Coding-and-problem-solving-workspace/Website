"use client"

import { Box, Typography } from "@mui/material"

export default function TestCases({runCode, testCases, results, theme}){
    return (
        <Box
        sx={{
          marginTop: 2,
          width: "100%",
          backgroundColor: theme === "vs-dark" ? "#1e1e1e" : "#f5f5f5",
          border: "1px solid #0f8b96",
          borderRadius: "4px",
          padding: 1,
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: theme === "vs-dark" ? "#ffffff" : "#1e1e1e" }}
        >
          Test Cases
        </Typography>
        <table className="min-w-full shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Sl. No.
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Input
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Expected Output
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((testCase, index) => (
              <tr key={testCase._id} className="border-b">
                <td
                  className={`py-4 px-6 text-sm ${
                    theme === "vs-dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {index + 1}
                </td>
                <td
                  className={`py-4 px-6 text-sm ${
                    theme === "vs-dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {testCase.input}
                </td>
                <td
                  className={`py-4 px-6 text-sm ${
                    theme === "vs-dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {testCase.expectedOutput}
                </td>
                <td
                  className={`py-4 px-6 text-sm ${
                    results[index] === "Passed"
                      ? "text-green-500"
                      : results[index] === "Failed"
                      ? "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  {!results ? "-" : results[index]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={runCode}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </Box>
    )
} 