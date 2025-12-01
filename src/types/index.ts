export type TransactionType = 'INCOME' | 'EXPENSE' | 'TRANSFER';

export interface Account {
  id: number;
  name: string;
  type: string; // e.g., 'Cash', 'Bank', 'E-Wallet'
  balance: number;
}

export interface Category {
  id: number;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  icon: string; // nama icon
}

export interface Transaction {
  id: number;
  amount: number;
  date: number; // timestamp
  note: string;
  type: TransactionType;
  account_id: number;
  category_id?: number; // null if transfer (opsional)
}
