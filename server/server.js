const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/', routes);

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});