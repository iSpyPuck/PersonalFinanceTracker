import React from "react";

export default function BudgetSummary({ budgets, transactions }) {
  const spentByCategory = transactions.reduce((acc, tx) => {
    if (tx.amount >= 0 || !tx.category) return acc;
    acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
    return acc;
  }, {});

  return (
    <div className="card">
      <h2>Budgets</h2>
      <div className="table">
        <div className="table-header">
          <span>Category</span>
          <span>Limit</span>
          <span>Spent</span>
          <span>Remaining</span>
          <span>Status</span>
        </div>
        {budgets.map(b => {
          const spent = spentByCategory[b.category] || 0;
          const remaining = b.limit - spent;
          const percent = b.limit > 0 ? (spent / b.limit) * 100 : 0;
          let status = "On track";

          if (percent > 100) {
            status = "Over budget";
          } else if (percent > 80) {
            status = "Close to limit";
          }

          return (
            <div className="table-row" key={b.id}>
              <span>{b.category}</span>
              <span>${b.limit.toFixed(2)}</span>
              <span>${spent.toFixed(2)}</span>
              <span>${remaining.toFixed(2)}</span>
              <span
                className={
                  status === "Over budget"
                    ? "negative"
                    : status === "Close to limit"
                    ? "warning"
                    : "positive"
                }
              >
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
