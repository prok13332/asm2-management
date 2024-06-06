const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const SECRET_KEY = 'your_secret_key';

// Giả sử bạn có một cơ sở dữ liệu người dùng đơn giản như thế này
const users = [
    {
        id: 1,
        username: 'user1@gmail.com',
        password: bcrypt.hashSync('123456az', 8) // Băm mật khẩu
    },
    {
        id: 2,
        username: 'user2@gmail.com',
        password: bcrypt.hashSync('password2', 8)
    }
];

app.use(cors()); // Sử dụng cors middleware
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).send('Email hoặc mật khẩu không đúng');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(400).send('Email hoặc mật khẩu không đúng');
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: 86400 // 24 hours
    });

    res.status(200).send({ auth: true, token: token });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
