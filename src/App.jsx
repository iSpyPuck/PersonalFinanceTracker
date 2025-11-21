import React, { useState } from "react";
import TransactionForm from "./components/TransactionForm.jsx";
import TransactionList from "./components/TransactionList.jsx";
import BudgetSummary from "./components/BudgetSummary.jsx";
import SpendingChart from "./components/SpendingChart.jsx";
import {
  initialAccounts,
  initialTransactions,
  defaultBudgets
} from "./data/sampleData.js";

export default function App() {
  const [accounts] = useState(initialAccounts);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [budgets] = useState(defaultBudgets);
  const [activeAccount, setActiveAccount] = useState("all");

  function handleAddTransaction(newTx) {
    setTransactions(prev => [
      ...prev,
      {
        ...newTx,
        id: prev.length ? prev[prev.length - 1].id + 1 : 1
      }
    ]);
  }

  function handleDeleteTransaction(id) {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  }

  const filteredTransactions =
    activeAccount === "all"
      ? transactions
      : transactions.filter(tx => tx.accountId === activeAccount);

  const totalBalance = accounts.reduce((sum, account) => {
    const accountTotal = transactions
      .filter(tx => tx.accountId === account.id)
      .reduce((acc, tx) => acc + tx.amount, 0);
    return sum + accountTotal;
  }, 0);

  const recurringCount = transactions.filter(tx => tx.recurring).length;

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Personal Finance Tracker</h1>
          <p className="subtitle">
            Track income, expenses, budgets, and trends across accounts.
          </p>
        </div>
        <div className="pill-group">
          <div className="pill">
            <span className="pill-label">Total Balance</span>
            <span className="pill-value">
              ${totalBalance.toFixed(2)}
            </span>
          </div>
          <div className="pill">
            <span className="pill-label">Accounts</span>
            <span className="pill-value">{accounts.length}</span>
          </div>
          <div className="pill">
            <span className="pill-label">Recurring</span>
            <span className="pill-value">{recurringCount}</span>
          </div>
        </div>
      </header>

      <main className="layout">
        <section className="left-column">
          <TransactionForm onAdd={handleAddTransaction} accounts={accounts} />
          <div className="card">
            <h2>Filter by Account</h2>
            <div className="pill-row">
              <button
                className={
                  activeAccount === "all" ? "pill-btn active" : "pill-btn"
                }
                onClick={() => setActiveAccount("all")}
              >
                All
              </button>
              {accounts.map(a => (
                <button
                  key={a.id}
                  className={
                    activeAccount === a.id ? "pill-btn active" : "pill-btn"
                  }
                  onClick={() => setActiveAccount(a.id)}
                >
                  {a.name}
                </button>
              ))}
            </div>
            <p className="muted small">
              Recurring transactions give a quick view of fixed monthly
              commitments and help you spot patterns in your spending.
            </p>
          </div>
          <BudgetSummary budgets={budgets} transactions={filteredTransactions} />
        </section>

        <section className="right-column">
          <SpendingChart transactions={filteredTransactions} />
          <TransactionList
            transactions={filteredTransactions}
            onDelete={handleDeleteTransaction}
          />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          This project highlights interactive charts, data handling, and
          budgeting logic in a single React app.
        </p>
      </footer>
    </div>
  );
}
