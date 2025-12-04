import { create } from 'zustand';
import db, { initDatabase } from '../database/db';
import { Account, Transaction, Category } from '../types';

interface AppState {
  accounts: Account[];
  transactions: Transaction[];
  categories: Category[];
  totalNetWorth: number;
  isBalanceVisible: boolean;
  
  // Actions
  toggleBalanceVisibility: () => void;
  loadData: () => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  addAccount: (name: string, type: string, initialBalance: number) => void;
}

export const useStore = create<AppState>((set, get) => ({
  accounts: [],
  transactions: [],
  categories: [],
  totalNetWorth: 0,
  isBalanceVisible: false,

  toggleBalanceVisibility: () => {
    set((state) => ({ isBalanceVisible: !state.isBalanceVisible }));
  },

  loadData: () => {
    try {
      initDatabase(); // Pastikan tabel dibuat
      const accounts = db.getAllSync('SELECT * FROM accounts') as Account[];
      const transactions = db.getAllSync('SELECT * FROM transactions ORDER BY date DESC') as Transaction[];
      const categories = db.getAllSync('SELECT * FROM categories') as Category[];

      const totalNetWorth = accounts.reduce((sum, acc) => sum + acc.balance, 0);

      set({ accounts, transactions, categories, totalNetWorth });
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  },

  addTransaction: (tx) => {
    try {
      // 1. Simpan Transaksi
      db.runSync(
        'INSERT INTO transactions (amount, date, note, type, account_id, category_id) VALUES (?, ?, ?, ?, ?, ?)',
        [tx.amount, tx.date, tx.note, tx.type, tx.account_id, tx.category_id ?? null]
      );

      // 2. Update Saldo Akun
      let balanceChange = tx.amount;
      if (tx.type === 'EXPENSE') balanceChange = -tx.amount;
      
      // Logic sederhana: update saldo di DB
      db.runSync('UPDATE accounts SET balance = balance + ? WHERE id = ?', [balanceChange, tx.account_id]);

      // 3. Refresh Data State
      get().loadData();
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  },

  addAccount: (name, type, initialBalance) => {
    try {
        db.runSync('INSERT INTO accounts (name, type, balance) VALUES (?, ?, ?)', [name, type, initialBalance]);
        get().loadData();
    } catch (error) {
        console.error('Failed to add account', error);
    }
  }
}));
