const express       = require('express');
const cookieParser  = require('cookie-parser');
const cors          = require('cors');

const app  = express();
const router = express.Router();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));


const { login } = require('../controllers/AuthController');
const verificarToken = require('../middleware/verificarToken');


router.post('/login', login);
router.get('/perfil', verificarToken, (req, res) => res.json(req.user));

module.exports = router;


const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Auth server ready at http://localhost:${PORT}/api/auth/login`)
);
app.use('/api/auth', router);