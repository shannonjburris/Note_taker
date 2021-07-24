const path   = require('path');
const fs     = require('fs');
const router = require('express').Router();

//set up id and notesArr we will use those later
let id;
let notesArr;

//get the notes and send them back to the page
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', function read(err, data) {
        if (err) {
            throw err;
        }
        //parse the data, send it back
        const content = JSON.parse(data);
        res.send(content);
    });
});

router.post('/notes', (req, res) => {
    //before saving a new note, get the existing notes 
    fs.readFile('./db/db.json', function read(err, data) {
        if (err) {
            throw err;
        }
        //parse the data, set id to be arr.length + 1 so we can increment easily
        const content = JSON.parse(data);
        id = content.length + 1;
        //get the tite and text from the request, add our new id
        let note = {
            'title': req.body.title,
            'text': req.body.text,
            'id': id
        }
        //call the content 'notesArr' and add the new note
        notesArr = content;
        notesArr.push(note);
        //finally, write notesArr (containing the new note) to the db.json file
        fs.writeFile('./db/db.json', JSON.stringify(notesArr), function read(err, data) {
            if (err) {
                throw err;
            }
        });
    });
    // notesArr.push(note);
    res.send('it worked');
})

router.delete('/notes/:id', (req, res) => {
    //get ID from url params
    deletedByID = parseInt(req.params.id);
    fs.readFile('./db/db.json', function read(err, data) {
        if (err) {
            throw err;
        }
        //parse the existing notes
        const content = JSON.parse(data);
        //filter the current db based on the ID to delete
        const newArray = content.filter(note => note.id !== deletedByID);
        //write the filtered array back to the db
        fs.writeFile('./db/db.json', JSON.stringify(newArray), function read(err, data) {
            if (err) { throw err; }
            console.log('note deleted');
        });
    });
    res.send('note deleted');
});

module.exports = router;