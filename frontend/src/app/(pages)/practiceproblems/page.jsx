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
    <div className="min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center text-blue-600">Practice Problems</h1>
        <div className="mt-10 overflow-x-auto">
          <table className="min-w-full shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">Difficulty</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">Likes</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr key={problem._id} className="border-b">
                  <td className="py-4 px-6 text-sm text-gray-200">{problem.title}</td>
                  <td className="py-4 px-6 text-sm text-gray-200">{problem.category.join(', ')}</td>
                  <td className="py-4 px-6 text-sm text-gray-200">{problem.difficulty}</td>
                  <td className="py-4 px-6 text-sm text-gray-200">{problem.likes}</td>
                  <td className="py-4 px-6 text-sm">
                    <Link href={`/problem/${problem._id}`}>
                      <button className="text-blue-500 hover:underline">Solve Problem</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}