const express = require('express')
const mongoose = require('mongoose')

const router = express.Router();

// MongoDB model
const User = mongoose.model('User', {
    name: String,
    email: String
})

// MongoDB CRUD routes
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    await user.save();
    res.send(user)
})

router.get('/users', async (req, res) => {
    const user = await User.find()
    res.send(user)
})

router.get('/users/:id', async (req, res) => {
    const user = await User(req.params.id)
    res.send(user)
})

router.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user)
})

router.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.sendStatus(200)
})

module.exports = router