const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2');
const { response, request } = require('express');

const app=express();

app.use(cors());

app.use(bodyparser.json());

//connect MYSQL database
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'userinfo',
    port:3306

});

//check database connection
db.connect(error=>{
    if(error)
        console.log('error')
        else
    console.log("database connected successfully")    

})


// get All data
app.get('/users',(request,response)=>{
    
    let qrr=`select * from user`
    db.query(qrr,(err,results)=>{
        if(err){
        console.log(err,"error")
        }
        if(results.length>0){
        response.send({
            message:"All user Data",
            data:results
        })
    }
    })
})

//get single data by ID
app.get('/users/:id',(req,res)=>{
    let qrId=req.params.id;
    let qrr=`select * from user where id=${qrId}`;
    db.query(qrr,(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result.length>0){
            res.send({
                message:"Get data by Id",
                data:result
            })
        }else{
            res.send({
                message:"data not found here"
            })
        }
    })
})


//Post data 
app.post('/users',(request,response)=>{
    console.log(request.body,"Post data success")
    let Fullname=request.body.fullname;
    let Email=request.body.email;
    let Mobile=request.body.mobile;

    let qrr= `insert into user(fullname,email,mobile)
     values ('${Fullname}','${Email}',${Mobile})`

     db.query(qrr,(error,result)=>{
         if(error) 
         console.log(error)
         
             response.send({
                 message:"Data added successfully",
                 data:result
             })
        
     })
})

// Update data
app.put('/users/:id',(request,response)=>{

    let uId=request.params.id
    console.log(uId)
    let Fullname=request.body.fullname;
    let Email=request.body.email;
    let Mobile=request.body.mobile;

    let qrr=`update user set fullname='${Fullname}', 
    email='${Email}', mobile='${Mobile}' where id=${uId} `;

    db.query(qrr,(err,result)=>{
        if(err)console.log(err)

        response.send({
            message:"Data updated successfully",
            data:result
        })
    })
})


//delete data
app.delete('/users/:id', (req,res)=>{
    let uID=req.params.id;
    let qrr= `delete from user where id=${uID}`;
    console.log(qrr)
    db.query(qrr,(error,result)=>{
        if(error)console.log(error)
    
        res.send({
            message:"Data deleted successfully",
          
        })
       
    })
})



app.listen(3000,()=>{
    console.log("Server is running on 3000 PORT");
})