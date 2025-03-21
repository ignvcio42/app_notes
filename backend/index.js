require('dotenv').config();

const config = require('./config.json');
const mongoose = require('mongoose');

mongoose.connect(config.connectionString);

const User = require('./models/user.model');
const Note = require('./models/note.model');

const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./utilities');

app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
);

app.get('/', (req, res) => {
    res.json({ data: 'hello world' })
})


//crear cuenta
app.post('/create-account', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error:true, message: 'Missing required fields' });
    }

    if (!email){
        return res.status(400).json({ error:true, message: 'Email is required' });}

    if (!password){
        return res.status(400).json({ error:true, message: 'Password is required' });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
        return res.status(400).json({ error:true, message: 'User already exists' });
    }

    const user = new User({ fullName, email, password });

    await user.save();

    const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '36000m'});

    return res.json({error: false, user, accessToken, message: 'User created successfully'});
});


//login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error:true, message: 'Email is required' });
    }

    if (!password){
        return res.status(400).json({ error:true, message: 'Password is required' });
    }

    const userInfo = await User.findOne({ email });

    if (!userInfo) {
        return res.status(400).json({ error:true, message: 'User not found' });
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = {user: userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '36000m'});

        return res.json({error: false, message: 'User logged in successfully', email, accessToken});
    } else {
        return res.status(400).json({ error:true, message: 'Email or password is incorrect' });
    }
});

//Obtener usuarios
app.get('/get-users', authenticateToken, async (req, res) => {
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id });

    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({ user: {fullName: isUser.fullName, email: isUser.email, _id: isUser._id, createdOn: isUser.createdOn}, message: '' });
});

//Agregar notas
app.post('/add-note', authenticateToken, async (req, res) => {
    const { title, content, tags} = req.body;
    const { user } = req;

    if (!title){
        return res.status(400).json({ error:true, message: 'Title is required' });
    }

    if (!content){
        return res.status(400).json({ error:true, message: 'Content is required' });
    }

    try {
        const note = new Note({ title, content, tags: tags || [], userId: user.user._id });
        await note.save();
        return res.json({error: false, note, message: 'Note added successfully'});
    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
});

//Editar notas
app.put('/edit-note/:noteId', authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned} = req.body;
    const { user } = req.user;

    if (!title && !content && !tags){
        return res.status(400).json({ error:true, message: 'No changes provided' });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({error: false, note, message: 'Note updated successfully'});
    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal server error' }); 
    }
});

//Obtener notas
app.get('/get-notes', authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });    
        return res.json({error: false, notes, message: 'All notes fetched successfully'});
    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
});

//Borrar notas
app.delete('/delete-note/:noteId', authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({error: false, message: 'Note deleted successfully'});
    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
});

//Update isPinned Value
app.put('/update-note-pinned/:noteId', authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned} = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }

        note.isPinned = isPinned

        await note.save();

        return res.json({error: false, note, message: 'Note updated successfully'});
    } catch (error) {
        return res.status(500).json({ error: true, message: 'Internal server error' }); 
    }
});

app.listen (8000);

module.exports = app