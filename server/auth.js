const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'live123';
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 'liverefresh123';
const refreshTokens = new Set();

function generateAccessToken(user) {
    return jwt.sign({ username: user.name, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}

function generateRefreshToken(user) {
    const token = jwt.sign({ username: user.name, email: user.email }, REFRESH_SECRET_KEY, { expiresIn: '7d' });
    refreshTokens.add(token);
    return token;
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    console.log(authHeader);

    const token = authHeader?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing!' });

    console.log(token);

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token!' });
        req.user = decoded;
        next();
    });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refreshTokens,
    authenticateToken
};
