// src/server.js

const express       = require('express');
// pull the expressjwt factory out of the module
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa       = require('jwks-rsa');
const cors        = require('cors');

// In-memory store (use a DB in production)
const messagesStore = [];

const app = express();
// Allow only your front‑end origin (or use '*' for open access)
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Authorization','Content-Type']
}));

// JSON body parser, if you need it
app.use(express.json());

// Replace with your Auth0 values:
const authConfig = {
  domain: 'dev-y13e3m1qgeu6ca0d.us.auth0.com',
  audience: 'https://my‑api.example.com'
};

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  secret: jwksRsa.expressJwtSecret({
    cache: true,                  // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5,     // prevent attackers from flooding your app
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer:
  audience: authConfig.audience,
  issuer:   `https://${authConfig.domain}/`,
  algorithms: ['RS256']
});

// GET /messages — return all messages
app.get('/messages', checkJwt, (req, res) => {
  res.json({ messages: messagesStore });
});

// POST /messages — add a message
app.post('/messages', checkJwt, (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Missing message text' });

  const message = {
    text,
    user: req.auth.name || req.auth.sub,
    timestamp: new Date().toISOString(),
  };

  messagesStore.push(message);
  res.status(201).json({ success: true, message });
});


app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid or missing token' });
  }
  next(err);
});

app.listen(3011, () => {
  console.log('API listening on http://localhost:3011');
});
