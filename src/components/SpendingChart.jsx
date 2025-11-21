import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const COLORS = ["#4f46e5", "#22c55e", "#eab308", "#ef4444", "#06b6d4"];

function buildBalanceSeries(transactions) {
  const sorted = [...transactions].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  let running = 0;
  return sorted.map(tx => {
    running += tx.amount;
    return {
      date: tx.date,
      balance: Number(running.toFixed(2))
    };
  });
}

function buildCategorySeries(transactions) {
  const totals = transactions.reduce((acc, tx) => {
    if (tx.amount >= 0 || !tx.category) return acc;
    acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
    return acc;
  }, {});

  return Object.entries(totals).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2))
  }));
}

export default function SpendingChart({ transactions }) {
  const balanceData = useMemo(
    () => buildBalanceSeries(transactions),
    [transactions]
  );
  const categoryData = useMemo(
    () => buildCategorySeries(transactions),
    [transactions]
  );

  return (
    <div className="card chart-grid">
      <div className="chart-panel">
        <h2>Balance Over Time</h2>
        {balanceData.length === 0 ? (
          <p className="muted">Add some transactions to see your trend.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={balanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="chart-panel">
        <h2>Spending by Category</h2>
        {categoryData.length === 0 ? (
          <p className="muted">No expenses yet for this period.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
