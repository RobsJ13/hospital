const express= require('express');
const app = new express();

const api=require('./routes/sample');
app.use('/api',api);




app.listen(5000,()=>{
    console.log(`Server running on port 5000 `)
})
