"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sampleProblems } from '../../../components/Dashboard/data/sampleProblems';

export default function PracticeProblems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    setProblems(sampleProblems);
  }, []);

  return (
    <div style={{
      background: 'rgba(30,42,76,0.90)',
      borderRadius: '32px',
      boxShadow: '0 8px 32px 0 rgba(127,90,240,0.10)',
      border: '1.5px solid rgba(127,90,240,0.10)',
      backdropFilter: 'blur(12px)',
      padding: '2.5rem',
      color: '#e0e7ef',
      margin: '2rem auto',
      maxWidth: 1200,
      minHeight: '70vh',
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 900,
        textAlign: 'center',
        background: 'linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '2.5rem',
        letterSpacing: 1.2,
        fontFamily: 'monospace',
      }}>
        Practice Problems
      </h1>
      <div style={{ overflowX: 'auto', borderRadius: '18px', boxShadow: '0 4px 24px rgba(127,90,240,0.10)' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: 'rgba(24,28,43,0.65)', borderRadius: '18px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: 'rgba(127,90,240,0.10)' }}>
              <th style={{ padding: '1rem', fontWeight: 700, color: '#7f5af0', fontSize: 18, textAlign: 'left' }}>Title</th>
              <th style={{ padding: '1rem', fontWeight: 700, color: '#0f8b96', fontSize: 18, textAlign: 'left' }}>Category</th>
              <th style={{ padding: '1rem', fontWeight: 700, color: '#7f5af0', fontSize: 18, textAlign: 'left' }}>Difficulty</th>
              <th style={{ padding: '1rem', fontWeight: 700, color: '#0f8b96', fontSize: 18, textAlign: 'left' }}>Likes</th>
              <th style={{ padding: '1rem', fontWeight: 700, color: '#e0e7ef', fontSize: 18, textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, idx) => (
              <tr key={problem._id} style={{ borderBottom: '1.5px solid rgba(127,90,240,0.10)', background: idx % 2 === 0 ? 'rgba(30,42,76,0.85)' : 'rgba(24,28,43,0.65)' }}>
                <td style={{ padding: '1rem', color: '#e0e7ef', fontWeight: 600 }}>{problem.title}</td>
                <td style={{ padding: '1rem', color: '#7f5af0', fontWeight: 600 }}>{problem.category.join(', ')}</td>
                <td style={{ padding: '1rem', color: '#0f8b96', fontWeight: 600 }}>{problem.difficulty}</td>
                <td style={{ padding: '1rem', color: '#e0e7ef', fontWeight: 600 }}>{problem.likes}</td>
                <td style={{ padding: '1rem' }}>
                  <Link href={`/problem/${problem._id}`}>
                    <button style={{
                      color: '#fff',
                      background: 'linear-gradient(90deg, #0f8b96 30%, #7f5af0 80%)',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '0.5rem 1.5rem',
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px #7f5af0',
                      transition: 'all 0.2s',
                    }}>Solve Problem</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}