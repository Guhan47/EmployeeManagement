const express=require('express');
const app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded());

app.get('/',(req, res, next) => {
    console.log('FIRST PAGE');
    res.send(`<h1>HELLO 1st</h1>`);

});

app.get('/second',(req, res, next) => {
    console.log('SECOND PAGE');
    res.send(`<form action="/third" method="POST"><input type="text" name="name">  <button type="submit">click</button></form>`);

});

app.post('/third',(req, res, next) => {
    console.log('THIRD PAGE',req.body);
    res.send(`<h1>HELLO 3rd</h1>`);
});



app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})