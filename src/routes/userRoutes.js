const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para login
router.post('/login', userController.login);

// Rota para obter todos os usuários
router.get('/users', userController.getAllUsers);

// Outras rotas para criar, atualizar e excluir usuários
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
