"use client";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function PracticeProblems({ problems }) {
  const [search, setSearch] = useState("");

  const filteredProblems = useMemo(() => {
    if (!search.trim()) return problems;
    const lower = search.toLowerCase();
    return problems.filter(
      (problem) =>
        problem.title.toLowerCase().includes(lower) ||
        problem.category.join(", ").toLowerCase().includes(lower) ||
        problem.difficulty.toLowerCase().includes(lower)
    );
  }, [problems, search]);

  return (
    <div
      style={{
        background: "rgba(30,42,76,0.90)",
        borderRadius: "32px",
        boxShadow: "0 8px 32px 0 rgba(127,90,240,0.10)",
        border: "1.5px solid rgba(127,90,240,0.10)",
        backdropFilter: "blur(12px)",
        padding: "2.5rem",
        color: "#e0e7ef",
        margin: "2rem auto",
        maxWidth: 1200,
        minHeight: "70vh",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 900,
          textAlign: "center",
          background:
            "linear-gradient(90deg, #7f5af0 30%, #0f8b96 80%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "2.5rem",
          letterSpacing: 1.2,
          fontFamily: "monospace",
        }}
      >
        Practice Problems
      </h1>
      {/* Search bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2.5rem",
        }}
      >
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            border: "1.5px solid #7f5af0",
            background: "rgba(24,28,43,0.85)",
            color: "#e0e7ef",
            fontSize: 18,
            fontWeight: 500,
            outline: "none",
            boxShadow: "0 2px 8px #7f5af022",
            transition: "border 0.2s",
            margin: "0 auto",
            fontFamily: "monospace",
          }}
        />
      </div>
      <div
        style={{
          overflowX: "auto",
          borderRadius: "18px",
          boxShadow: "0 4px 24px rgba(127,90,240,0.10)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            background: "rgba(24,28,43,0.65)",
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ background: "rgba(127,90,240,0.10)" }}>
              <th
                style={{
                  padding: "1rem",
                  fontWeight: 700,
                  color: "#7f5af0",
                  fontSize: 18,
                  textAlign: "left",
                }}
              >
                Title
              </th>
              <th
                style={{
                  padding: "1rem",
                  fontWeight: 700,
                  color: "#0f8b96",
                  fontSize: 18,
                  textAlign: "left",
                }}
              >
                Category
              </th>
              <th
                style={{
                  padding: "1rem",
                  fontWeight: 700,
                  color: "#7f5af0",
                  fontSize: 18,
                  textAlign: "left",
                }}
              >
                Difficulty
              </th>
              <th
                style={{
                  padding: "1rem",
                  fontWeight: 700,
                  color: "#0f8b96",
                  fontSize: 18,
                  textAlign: "left",
                }}
              >
                Likes
              </th>
              <th
                style={{
                  padding: "1rem",
                  fontWeight: 700,
                  color: "#e0e7ef",
                  fontSize: 18,
                  textAlign: "left",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem, idx) => (
              <tr
                key={problem._id}
                style={{
                  borderBottom: "1.5px solid rgba(127,90,240,0.10)",
                  background:
                    idx % 2 === 0
                      ? "rgba(30,42,76,0.85)"
                      : "rgba(24,28,43,0.65)",
                }}
              >
                <td
                  style={{
                    padding: "1rem",
                    color: "#e0e7ef",
                    fontWeight: 600,
                  }}
                >
                  {problem.title}
                </td>
                <td
                  style={{
                    padding: "1rem",
                    color: "#7f5af0",
                    fontWeight: 600,
                  }}
                >
                  {problem.category.join(", ")}
                </td>
                <td
                  style={{
                    padding: "1rem",
                    color: "#0f8b96",
                    fontWeight: 600,
                  }}
                >
                  {problem.difficulty}
                </td>
                <td
                  style={{
                    padding: "1rem",
                    color: "#e0e7ef",
                    fontWeight: 600,
                  }}
                >
                  {problem.likes}
                </td>
                <td style={{ padding: "1rem" }}>
                  <Link href={`dashboard/problem/${problem._id}`}>
                    <button
                      style={{
                        color: "#fff",
                        background:
                          "linear-gradient(90deg, #0f8b96 30%, #7f5af0 80%)",
                        border: "none",
                        borderRadius: "12px",
                        padding: "0.5rem 1.5rem",
                        fontWeight: 700,
                        fontSize: 16,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px #7f5af0",
                        transition: "all 0.2s",
                      }}
                    >
                      Solve Problem
                    </button>
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
