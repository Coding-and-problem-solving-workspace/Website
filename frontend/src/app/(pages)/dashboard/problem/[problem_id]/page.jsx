"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RemoteCodeEditor1 from '../../../../../components/Dashboard/RemoteCodeEditor1';
import { Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '@/context/authContext';

export default function ProblemPage() {
  const params = useParams();
  const { problem_id } = params;
  const [problem, setProblem] = useState(null);
  const { currentUser, userLoggedIn } = useAuth();
  const fetchProblem = async ()=>{
    if(!userLoggedIn){
      return;
    }
    const token = await currentUser?.getIdToken();
    const resp = await axios.get(`http://localhost:9000/api/v1/problems/${problem_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if(resp.status === 200){
      console.log(resp.data.problem);
      setProblem(resp?.data?.problem);
    }
  }
  useEffect(() => {
    fetchProblem();
  }, [problem_id]);

  if (!problem) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="flex" key={problem_id}>
      <Box
      sx={{
        marginTop: 3,
        marginX: 2,
        border: "1px solid #0f8b96",
        position: "relative",
      }}
    >
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center text-blue-700">{problem.title}</h1>
        <p className="mt-6 text-lg text-gray-200">{problem.description}</p>

        <div className="mt-6">
        {problem.testCases.slice(0, 2).map((testCase, index) => (
            <div key={testCase._id} className="mb-6">
              <h3 className="text-2xl font-semibold mb-2">Sample Input {index + 1}</h3>
              <pre className="bg-gray-700 p-4 rounded">{testCase.input}</pre>

              <h3 className="text-2xl font-semibold mt-4 mb-2">Expected Output {index + 1}</h3>
              <pre className="bg-gray-700 p-4 rounded">{testCase.expectedOutput}</pre>
            </div>
          ))}
        </div>
        {/* <div
          id="terminal"
          className="mt-8 bg-black text-green-300 p-4 rounded h-64 overflow-auto font-mono text-sm"
        >
          <p>$ Running your code...</p>
          <p>Output:</p>
          <p>{problem.testCases[0].expectedOutput}</p>
          <p className="mt-4">Execution Time: 0.05s</p>
          <p>Memory Usage: 15MB</p>
        </div> */}
      </div>
      </Box>
      <div>
        <div className="mt-8">
          <RemoteCodeEditor1 testCases={problem.testCases} problemId={problem._id} />
        </div>
      </div>
    </div>
  );
}
  