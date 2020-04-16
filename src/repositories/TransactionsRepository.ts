import Transaction from '../models/Transaction';

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outcome = this.transactions.reduce(
      (sum, transaction) =>
        transaction.type === 'outcome' ? sum + transaction.value : sum,
      0,
    );

    const income = this.transactions.reduce(
      (sum, transaction) =>
        transaction.type === 'income' ? sum + transaction.value : sum,
      0,
    );

    const totalBalance = income - outcome;

    return {
      income,
      outcome,
      total: totalBalance,
    };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionRepository;
