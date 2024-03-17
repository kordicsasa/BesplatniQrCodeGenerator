import express = from 'express';
const app = express();
const qr = require('qr-image');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/generate', (req, res) => {
    const url = req.body.url;
    const qr_png = qr.image(url, { type: 'png' });
    qr_png.pipe(fs.createWriteStream('public/qrcode.png'));
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});