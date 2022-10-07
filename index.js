const express = require('express');
const app = express();
const mysql = require("mysql2");
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'z',
    password: '',
    database:'moviedatabase'

  })
  
  connection.connect((err) => {
    if(err){
        console.log('Error connecting to Db' + err.message);
    } else { 
        console.log('Connection Established');
    }   
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use(express.json());

app.get("/api/get", (req,res)=>{
const sqlSelect = "Select *from movie_review";
connection.query(sqlSelect,(err,result)=>{
    res.send(result);
})
})
app.post("/api/insert",(req,res)=>{
    const movieNames =req.body.Movies
    const review = req.body.review
    const sqlInsert = "Insert into movie_review (Movies , review) values (?,?)"
    connection.query(sqlInsert, [movieNames, review], (err,result)=>{
        console.log(result);
    })
   
})

app.delete('/api/delete/:Movies',(req,res)=>{
    const name = req.params.Movies
    const sqlDelete = "delete from movie_review WHERE Movies = ?";
    connection.query(sqlDelete,name,(err,result)=>{
        if(err) console.log(err)
    })
})
app.put('/api/update',(req,res)=>{
    const name = req.body.Movies;
    const review = req.body.review;
    const sqlupdate = "update movie_review set review = ? where Movies = ?";
    connection.query(sqlupdate,[review , name] , (err,result)=>{
        if(err) console.log(err)
    })
})
app.listen(3001, ()=>{
    console.log('Hello Teri Maa ki choot');
})
