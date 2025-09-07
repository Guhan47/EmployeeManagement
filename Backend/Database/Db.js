const mysql =require('mysql2');
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'gooks47',
    database:'RS'
})

db.connect((err)=>{
    if(err){
        console.log('error in connecting to database');
        return;
    }
    console.log('connected to database')
})
module.exports=db;