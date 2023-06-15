const express= require('express');
const router = express.Router();
const fs=require('fs');

const path = './data.json';

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.get('/',(req,res)=>{
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error("Error" ,err);
          return res.status(500).send('Error reading hospitals data');
        }
        const hospitals = JSON.parse(data);
        res.json(hospitals);  
      });
})

router.post('/add',(req,res)=>{
    //res.send(`hi this is post request`);
    //console.log(req.body);
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error("Error" ,err);
          return res.status(500).send('Error reading hospitals data');
        }
        const hospitals = JSON.parse(data);
        hospitals.push(req.body) 
        var x=JSON.stringify(hospitals)
        fs.writeFile(path, x, (err) => {
        if (err)
          console.log(err);
        else {
        res.send(x)
        }

})
})
})

router.put('/edit',(req,res)=>{
    //res.send(`hi this is put request`);
    //hos=JSON.parse(fs.readFile(path));
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error("Error" ,err);
        return res.status(500).send('Error reading hospitals data');
      }
      const hospitals = JSON.parse(data);
      console.log(hospitals)
      res.send(`hi this is put request`);
    })
})

router.delete('/del',(req,res)=>{
    res.send(`hi this is del request`);
})



module.exports=router; 