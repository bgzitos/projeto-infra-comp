const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send('Aplicação funcionando infra compjr');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { app, server };