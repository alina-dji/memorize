const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log('server running')))
.catch((err) => console.log('error connecting to db', err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.get('/', authMiddleware.ifLoggedout, (req, res) => {
    res.render('home.ejs');
});

app.use('/workspace', workspaceRoutes);
app.use(authRoutes);

app.use((req, res) => {
    res.status(404).render('404.ejs');
});