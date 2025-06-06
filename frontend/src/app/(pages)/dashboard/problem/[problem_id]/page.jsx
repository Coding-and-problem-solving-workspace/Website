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
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'flex-start' }} key={problem_id}>
      <Box
        sx={{
          mt: 4,
          mx: 2,
          border: '1.5px solid #0f8b96',
          borderRadius: '32px',
          background: 'rgba(30,42,76,0.90)',
          boxShadow: '0 8px 32px 0 rgba(127,90,240,0.10)',
          backdropFilter: 'blur(12px)',
          p: { xs: 2, md: 6 },
          minWidth: 420,
          maxWidth: 600,
          color: '#e0e7ef',
        }}
      >
        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 900,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '2rem',
          letterSpacing: 1.2,
          fontFamily: 'monospace',
        }}>{problem.title}</h1>
        <p style={{ fontSize: 18, color: '#e0e7ef', marginBottom: 24 }}>{problem.description}</p>
        <div style={{ marginTop: 24 }}>
          {problem.testCases.slice(0, 2).map((testCase, index) => (
            <div key={testCase._id} style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#7f5af0' }}>Sample Input {index + 1}</h3>
              <pre style={{ background: 'rgba(24,28,43,0.65)', color: '#0f8b96', padding: 16, borderRadius: 12, fontSize: 16 }}>{testCase.input}</pre>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginTop: 16, marginBottom: 8, color: '#7f5af0' }}>Expected Output {index + 1}</h3>
              <pre style={{ background: 'rgba(24,28,43,0.65)', color: '#0f8b96', padding: 16, borderRadius: 12, fontSize: 16 }}>{testCase.expectedOutput}</pre>
            </div>
          ))}
        </div>
      </Box>
      <Box sx={{ flex: 1, ml: 4, mt: 4 }}>
        <RemoteCodeEditor1 testCases={problem.testCases} problemId={problem._id}/>
      </Box>
    </div>
  );
}
