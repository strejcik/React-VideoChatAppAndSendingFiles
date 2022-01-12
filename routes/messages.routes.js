const router = require('express').Router();
const Message = require('../models/message.model');
const fs = require('fs');
let path = require('path');


//add
router.post(`/upload`, async(req, res) => {
    let newpath;
    let file;
    let filename;

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No files were uploaded.');
    } else {
        
        newpath = path.resolve(`./files/${req.query.conversationId}/${req.query.sender}`);
        file = req.files.file;
        filename = file.name;
        if (!fs.existsSync(newpath)){
            fs.mkdirSync(path.resolve(`./files/${req.query.conversationId}/${req.query.sender}`), { recursive: true });
        }
        
        file.mv(`${newpath}/${filename}`, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }


    
    
    
    let msg = {};
    if(!req.files || Object.keys(req.files).length === 0){
        msg = {
            sender: req.query.sender,
            text: req.query.text,
            conversationId: req.query.conversationId,
            filePath: ``
        };
    } else { 
        msg = {
            sender: req.query.sender,
            text: req.query.text,
            conversationId: req.query.conversationId,
            filePath:`${newpath}/${filename}`
        };
    }

    const newMessage = new Message(msg);


    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err)
    {
        res.status(500).json(err);
    }
});

router.get('/download', (req, res, next) => {
    try {
      const file = req.query.filePath;
      res.download(file);
    } catch (err) {
      console.log(err);
    }
  });

//get

router.get("/:conversationId", async(req,res) => {
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })

        res.status(200).json(messages);
    }catch(err)
    {
        res.status(500).json(err);
    }
});

module.exports = router;