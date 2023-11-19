// imports
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

// create JSON server
const server = jsonServer.create();
const router = jsonServer.router('db.json');

// read users
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

// mandatory middlewares
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

// data for token creation
const SECRET_KEY = '123456789'
const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token 
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err);
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
    return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1;
}

// Get user
function getUser({ email, password }) {
    return userdb.users.find(user => user.email === email && user.password === password);
}

// Login endpoint
server.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (isAuthenticated({ email, password }) === false) {
        const status = 401;
        const message = 'Incorrect email or password';
        res.status(status).json({ status, message });

        return;
    }

    const user = getUser({ email, password });

    const access_token = createToken({ id: user.id, email: user.email, password: user.password });

    res.status(200).json({ access_token });
});

// All other endpoints
server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (req.method !== 'OPTIONS') {
        if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
            const status = 401;
            const message = 'Bad authorization header';
            res.status(status).json({ status, message });

            return;
        }

        try {
            verifyToken(req.headers.authorization.split(' ')[1]);
        } catch (err) {
            const status = 401;
            const message = 'Error: access_token is not valid';
            res.status(status).json({ status, message });

            return;
        }
    }

    next();
});

// Get user endpoint
server.get('/user/details', (req, res) => {
    const jwtPayload = jwt.decode(req.headers.authorization.split(' ')[1]);
    
    res.status(200).json({ user: jwtPayload });
})

// Adding /api  prefix
server.use('/api', router);

server.listen(3001, () => {
    console.log('Run Auth API Server')
})
