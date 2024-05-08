const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const ConnectMongoDB = require("./src/database");

dotenv.config({ path: "src/.env" });

const app = express();

ConnectMongoDB();

app.use(express.json());
app.use('/', userRoutes);


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'login.html'));
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    res.redirect('/success');
});


app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'success.html'));
});


app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

const fetch = require('node-fetch');

const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) 
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login bem-sucedido:', data);
        } else {
            const errorMessage = await response.text();
            console.error('Erro ao fazer login:', errorMessage);
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error.message);
    }
};

// Exemplo de uso:
loginUser('gustavo@hotmail.com', 'gustavo123');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server rodando na porta: ${PORT}`);
});
