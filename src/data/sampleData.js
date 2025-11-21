export const initialAccounts = [
  { id: "checking", name: "Checking", type: "bank" },
  { id: "savings", name: "Savings", type: "bank" },
  { id: "cash", name: "Cash", type: "cash" }
];

export const initialTransactions = [
  {
    id: 1,
    date: "2025-11-01",
    description: "Paycheck",
    amount: 2500,
    type: "income",
    category: "Salary",
    accountId: "checking",
    recurring: true
  },
  {
    id: 2,
    date: "2025-11-02",
    description: "Groceries",
    amount: -120,
    type: "expense",
    category: "Groceries",
    accountId: "checking",
    recurring: false
  },
  {
    id: 3,
    date: "2025-11-03",
    description: "Rent",
    amount: -1500,
    type: "expense",
    category: "Housing",
    accountId: "checking",
    recurring: true
  },
  {
    id: 4,
    date: "2025-11-05",
    description: "Dinner out",
    amount: -60,
    type: "expense",
    category: "Eating Out",
    accountId: "checking",
    recurring: false
  },
  {
    id: 5,
    date: "2025-11-06",
    description: "Savings transfer",
    amount: -300,
    type: "transfer",
    category: "Transfer",
    accountId: "checking",
    recurring: true
  },
  {
    id: 6,
    date: "2025-11-06",
    description: "Savings transfer",
    amount: 300,
    type: "transfer",
    category: "Transfer",
    accountId: "savings",
    recurring: true
  }
];

export const defaultBudgets = [
  { id: "Housing", category: "Housing", limit: 1500 },
  { id: "Groceries", category: "Groceries", limit: 500 },
  { id: "Eating Out", category: "Eating Out", limit: 200 },
  { id: "Entertainment", category: "Entertainment", limit: 200 }
];
