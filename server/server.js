// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// MongoDB connection
mongoose.connect('mongodb+srv://harshitsaini61:playitall123@cluster0.5us9mui.mongodb.net/')
    .then(()=>{
        //listen for request
        console.log("connected to database")
    })
    .catch((error) => {
        console.log(error)
    })

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post('/notes', async (req, res) => {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    });
    await newNote.save();
    res.json(newNote);
});

app.put('/notes/:id', async (req, res) => {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
});

app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
