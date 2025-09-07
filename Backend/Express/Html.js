const express=require('express');
const app=express();
const path=require('path');
const db=require('../Database/Db.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const names=db.query('SELECT * FROM customer',(err,result)=>{
    if(err){
        console.log('error in fetching data');
        return;
    }
    else{
        console.log(result);
        return result; 
    }
})

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../views/index.html'));
});

app.post('/insert',(req,res)=>{
    const name = req.body.name;
    const city = req.body.city;
    const age = req.body.age;  // 👈 new field

    const sql = 'INSERT INTO customer (name, city, age) VALUES (?, ?, ?)';
    db.query(sql, [name, city, age], (err, result) => {
        if(err){
            console.log('❌ error in inserting data:', err.message);
            return res.status(500).send('Error inserting data');
        } else {
            console.log('✅ Data inserted:', result);
            res.redirect('/');
        }
    });
});

app.listen(3000, () => {
    console.log('🚀 Backend running on http://localhost:3000');
});
