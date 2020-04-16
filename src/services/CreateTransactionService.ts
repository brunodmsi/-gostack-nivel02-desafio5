import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const actualBalance = this.transactionRepository.getBalance();

    if (type === 'outcome' && actualBalance.total - value < 0) {
      throw Error('Balance total cannot be under 0.');
    }

    const transaction = this.transactionRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
