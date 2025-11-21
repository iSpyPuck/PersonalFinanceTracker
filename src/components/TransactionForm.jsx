import React, { useState } from "react";

const emptyForm = {
  date: "",
  description: "",
  amount: "",
  type: "expense",
  category: "",
  accountId: "checking",
  recurring: false
};

export default function TransactionForm({ onAdd, accounts }) {
  const [form, setForm] = useState(emptyForm);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.date || !form.description || !form.amount) return;

    const amountNumber = Number(form.amount);
    if (Number.isNaN(amountNumber)) return;

    onAdd({
      ...form,
      amount:
        form.type === "expense" || amountNumber < 0
          ? -Math.abs(amountNumber)
          : Math.abs(amountNumber)
    });
    setForm(emptyForm);
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <div className="grid grid-2">
        <label>
          <span>Date</span>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Type</span>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="transfer">Transfer</option>
          </select>
        </label>
        <label>
          <span>Description</span>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Rent, groceries, paycheck..."
          />
        </label>
        <label>
          <span>Amount</span>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            step="0.01"
          />
        </label>
        <label>
          <span>Category</span>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Housing, Groceries..."
          />
        </label>
        <label>
          <span>Account</span>
          <select
            name="accountId"
            value={form.accountId}
            onChange={handleChange}
          >
            {accounts.map(a => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="checkbox-row">
        <input
          type="checkbox"
          name="recurring"
          checked={form.recurring}
          onChange={handleChange}
        />
        <span>Recurring transaction</span>
      </label>
      <button type="submit" className="primary-btn">
        Add
      </button>
    </form>
  );
}
