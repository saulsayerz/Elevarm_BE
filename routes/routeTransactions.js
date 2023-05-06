const express = require('express');
const router = express.Router();
const { insertTransaction, findAllTransactions, deleteTransaction, updateTransaction } = require('../services/transaction');

router.post('/transactions', async (req, res) => {
  try {
    const result = await insertTransaction(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/transactions', async (req, res) => {
  try {
    const result = await findAllTransactions();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/transactions/:id', async (req, res) => {
  try {
    const result = await deleteTransaction(req.params.id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/transactions/:id', async (req, res) => {
  try {
    const result = await updateTransaction(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
