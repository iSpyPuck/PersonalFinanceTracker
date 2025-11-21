import React from "react";

export default function TransactionList({ transactions, onDelete }) {
  return (
    <div className="card">
      <h2>Transactions</h2>
      <div className="table">
        <div className="table-header">
          <span>Date</span>
          <span>Description</span>
          <span>Category</span>
          <span>Account</span>
          <span>Amount</span>
          <span>Recurring</span>
          <span />
        </div>
        {transactions.length === 0 && (
          <div className="table-row empty">
            No transactions yet. Add your first one above.
          </div>
        )}
        {transactions.map(tx => (
          <div className="table-row" key={tx.id}>
            <span>{tx.date}</span>
            <span>{tx.description}</span>
            <span>{tx.category || "-"}</span>
            <span>{tx.accountId}</span>
            <span
              className={tx.amount < 0 ? "negative" : "positive"}
            >
              {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
            </span>
            <span>{tx.recurring ? "Yes" : "No"}</span>
            <span>
              <button
                className="small-btn"
                onClick={() => onDelete(tx.id)}
              >
                ✕
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
