const express = require('express');
const router = express.Router();
const {List} = require('../db/model/List');
const {Task} = require('../db/model/Task');



/* ______________________________ LISTAS __________________________________ */

// GET Listas
router.get('/',  (req, res) => {
    
    List.find().then((list) => {
        res.send(list);
    }).catch((err) =>{
        res.send(err);
    })
});

// GET Lista especifica
router.get('/:listid', async (req, res) => {
    try {
        const list = await List.findById(req.params.listId);
        res.json(list);
    } catch (err) {
        res.json({ message: err })
    }
});

// POST Lista
router.post('/', async (req, res) => {
    const list = new List({
        title: req.body.title
    });
    //guardamos la lista en la DB con .save()(devuelve una promesa)
    try {
        const listDoc = await list.save();
        res.json(listDoc);
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
});


// UPDATE Lista Especifica
router.patch('/:id', async (req, res) => {
    //id need to match the req.param 
    try {
        
        const updatedList = await List.updateOne({ _id: req.params.id }, { $set: req.body });
        res.json(updatedList);
    } catch (err) {
        res.json({ message: err })
    }
});


// DELETE Lista Especifica
router.delete('/:id', async (req, res) => {
    try {
        //id need to match the req.param 
        const removedList = await List.remove({ _id: req.params.id });
        res.json(removedList);
    } catch (err) {
        res.json({ message: err })
    }
});




/* __________________________________ TAREAS ______________________________________ */

// GET tareas de una lista especifica
router.get('/:listId/task', async (req, res) => {
    try {
        const tasks = await Task.find({_listId:req.params.listId});
        res.json(tasks);
    } catch (err) {
        res.json({ message: err })
    }
});


// POST tarea en una lista especifica
router.post('/:listId/task', async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    try {
        const taskDoc = await newTask.save();
        res.json(taskDoc);
    } catch (err) {
        res.json({ message: err })
    }
});


//UPDATE tarea de una lista especifica
router.patch('/:listId/task/:taskId',  (req, res) => {
    //id need to match the req.param 
    Task.findOneAndUpdate({
        _id:req.params.taskId,
        _listId:req.params.listId
    },{
        $set:req.body
    }).then(()=>{
        res.sendStatus(200);
    }).catch(err =>{
        res.sendStatus(500);
    })
});

// DELETE Tarea de una lista especifica
router.delete('/:listId/task/:taskId', async (req, res) => {
    Task.findOneAndDelete({
        _id:req.params.taskId,
        _listId:req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    }).catch(err =>{
        res.sendStatus(500);
    })
});


module.exports = router;