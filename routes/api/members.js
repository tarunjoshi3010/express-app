const express = require('express');
const router = express.Router();
const members = require('./members_data');
const uuid = require('uuid');
const { restart } = require('nodemon');

//routes get all members
router.get('/', (req, res) => {
    res.json(members);
});

//routes get single members
router.get('/:id', (req, res) => {
   // res.send(req.params.id);
   const found = members.some(member => member.id === parseInt(req.params.id));
   if(found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
   } else {
    res.status(400).json({msg: `No Records available with id: ${req.params.id}`});
   }
   
});

//create member
router.post('/', (req,res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status : 'active'
    }
    if(!newMember.name || !newMember.email) {
        res.status(400).json({msg : 'please include name and email'})
    }
    members.push(newMember);
    res.send(members);
});

//updtae member
router.put('/:id', (req,res) => {
const found = members.some(member => member.id === parseInt(req.params.id))

if(found) {
    const updateMember = req.body;

    members.forEach(member => {
        if(member.id === parseInt(req.params.id)) {
            member.name = updateMember.name? updateMember.name : member.name;
            member.email = updateMember.email? updateMember.email : member.email;
            res.json({msg : 'Member update :', member})
        }
    })
   
} else {
    res.status(200).json({msg : `No record found for member id: ${req.params.id}`})
}

});



//delete  single members
router.delete('/:id', (req, res) => {
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
     res.json(members.filter(member => member.id !== parseInt(req.params.id)));
    } else {
     res.status(400).json({msg: `No Records available with id: ${req.params.id}`});
    }
    
 });
module.exports = router;