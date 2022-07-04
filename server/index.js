
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Admin = require('./models/admin.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/React')


app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

app.post('/api/login', async (req, res) => {
    console.log(req.body);
    let user = await User.findOne({
        email: req.body.email,
    })
    if (!user) return res.json({ status: 'error', error: 'invalid Login' })
    const isPasswordIsvalid = await bcrypt.compare(req.body.password, user.password)
    if (isPasswordIsvalid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            'secret55'
        )
        res.json({ status: 'ok', user: token })
    } else {
        res.json({ status: 'error', user: false })
    }
})

app.get('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decode = jwt.verify(token, 'secret55')
        const email = decode.email
        const user = await User.findOne({ email: email })
        return res.json({ status: 'ok', quote: user.quote })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' })
    }
})
app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decode = jwt.verify(token, 'secret55')
        const email = decode.email
        const user = await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        )
        return res.json({ status: 'ok', quote: user.quote })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' })
    }
})
app.post('/api/admin/login', async (req, res) => {
    console.log(req.body);
    let admin = await Admin.findOne({
        email: req.body.email,
    })
    if (!admin) return res.json({ status: 'error', error: 'invalid Login' })
    const isPasswordIsvalid = await bcrypt.compare(req.body.password, admin.password)
    if (isPasswordIsvalid) {
        const admintoken = jwt.sign(
            {
                email: admin.email
            },
            'secretAdmin11'
        )
        res.json({ status: 'ok', admin: admintoken })
    } else {
        res.json({ status: 'error', admin: false })
    }

})
app.get('/api/admin/userDetails', async (req, res) => {
    // console.log(85525);
    // let users = await User.find()
    // console.log(users);
    // res.json({ status: 'ok', users })
    const token = req.headers['x-access-token']
    try {
        const decode = jwt.verify(token, 'secretAdmin11')
        const email = decode.email
        // console.log(email);
        let userData = await User.find()
        return res.json({ status: 'ok', userData })
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'invalid token' })
    }

})
app.post('/api/admin/editUser', async (req, res) => {
    // console.log(req.body);
    try {
        await User.updateOne(
            { _id: req.body.id },
            {
                ...req.body,
            }
        );
        return res.json({ status: 'ok' });
    } catch (err) {
        return res.json({ status: 'error' });
    }
});
app.delete('/api/admin/deleteUser', async (req, res) => {
    try {
        console.log(req.body);
        let response = await User.deleteOne({ _id: req.body.id });
        console.log(response);
        return res.json({ status: true });
    } catch (err) {
        console.log(err);
    }
})

app.listen(5000, () => {
    console.log('server started @ 5000');
})