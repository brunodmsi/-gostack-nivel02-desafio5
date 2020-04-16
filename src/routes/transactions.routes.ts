import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRouter = Router();
const transactionsRepository = new TransactionsRepository();

transactionsRouter.get('/', (request, response) => {
  const transactions = transactionsRepository.all();
  const balance = transactionsRepository.getBalance();

  const balancedTransactions = {
    transactions,
    balance,
  };

  return response.json(balancedTransactions);
});

transactionsRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransation = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransation.execute({ title, value, type });

    return response.json(transaction);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default transactionsRouter;
