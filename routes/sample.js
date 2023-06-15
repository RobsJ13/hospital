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
      hospitals[0].p_count = Number(hospitals[0].p_count)+ 1;
      fs.writeFile(path,JSON.stringify(hospitals,null,2),err=>{
        if(err){
          console.log('Error in parsing')
        }
      })
      res.send("File Successfully Edited");
    })
})

router.delete('/del',(req,res)=>{
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error("Error" ,err);
      return res.status(500).send('Error reading hospitals data');
    }
    const hospitals = JSON.parse(data);
    console.log(hospitals.length);
    if(hospitals.length === 0 || hospitals ===''){
      res.send('No elements to delete.')
    }
    else{
      delete (hospitals[0])
      console.log(hospitals);
      fs.writeFile(path,JSON.stringify(hospitals,null,2),err=>{
        if(err){
          console.log('Error in parsing');
        }
      })
      res.send('Successfully deleted a record')
    }
  })
})



module.exports=router; 