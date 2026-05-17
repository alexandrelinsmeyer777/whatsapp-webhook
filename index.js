const express = require('express');
const app = express();
app.use(express.json());

// Token de verificação que você vai colocar lá no painel do Meta
const VERIFY_TOKEN = "MEU_TOKEN_SECRETO_123";

// 1. Rota de Validação do Webhook (GET)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFICADO');
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403);
        }
    }
});

// 2. Rota para Receber as Mensagens (POST)
app.post('/webhook', (req, res) => {
    const body = req.body;

    console.log('Mensagem recebida do WhatsApp:', JSON.stringify(body, null, 2));

    // Responde com 200 OK para o Meta saber que você recebeu
    res.status(200).send('EVENT_RECEIVED');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));