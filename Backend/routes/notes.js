const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/fetchUser")
const NotesModal = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { findById } = require('../models/User');

//Route 1: to get all the Notes using: GET "/app/notes/getallnotes endpoint"

router.get('/getallnotes', fetchuser, async (req, res) => {
try{
    const notes = await NotesModal.find({ user: req.user.id });
    res.send(notes)

}catch (error) {
    console.error(error.message);
     res.status(500).send("internal sever error");
}
})


//Route 2: to add new  Notes using: POST"/app/notes/addnotes endpoint"

router.post('/addnotes', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3, max: 15 }),
    body('description', 'Description must be at least 5 charecter').isLength({ min: 8 }),
], async (req, res) => {

    
    /*const notes = await Notes.find({ user: req.user.id });
    res.send(notes)*/ //it is use for testing 
try{
    const errors = validationResult(req);

    //if any error occur then return Bad request error

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });   //its chaking the req is validate or not 
    }


    const { title, description, tag } = req.body

    const note = new NotesModal({
        title,
        description,
        tag,
        user: req.user.id
    })
   const saveNote  =  await note.save();
    res.json(saveNote);

} catch (error) {
    console.error(error.message);
     res.status(500).send("internal sever error");
}

})

//Route 3: Update a exsisting  Notes using: PUT"/app/notes/addnotes endpoint"

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title,description,tag} = req.body;
    try{
     //create a new note object 
    const newNote  = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};  // i used this object for updating particular values in modal not all

    //Find teh note to be updated and update it 
    let note = await NotesModal.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await NotesModal.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true })
    res.json({note});
    }
    catch(error){
    console.error(error.message);
     res.status(500).send("internal sever error");
    }
    
})

//Route 3: Delete a exsisting  Notes using: DELETE"/app/notes/addnotes endpoint"


router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const {title,description,tag} = req.body;
    try{

    //Find teh note to be updated and update it 
    let note = await NotesModal.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    
    //Allow deletion only if the user own this Note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note = await NotesModal.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted",note:note});
    }
    catch(error){
    console.error(error.message);
     res.status(500).send("internal sever error");
    }
    
})


module.exports = router