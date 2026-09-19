const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');



app.use(cors());
app.use(express.json());



const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2001HAJHOUJREALMADRID$$$$',
  database: 'database11',
});


app.post("/Ajouter",async(req,res)=>{
    const body=req.body;

    if(!body.name1 && !body.name2) {
        res.send("tous les champs sont reduis")
        return 
    }

    const {name1,name2}=body

    const query=`insert into user (name1,name2) values ("${name1}","${name2}")`

    try {
        await pool.query(query)
        res.send("opération passée avec succes")
    } catch (error) {
        console.log(error)
        res.send("une erreur est servenue")
    }
})




app.get("/recuperer",async(req,res)=>{
   try {
      const [rows]=await pool.query("select * from user")

      console.log(rows)

      res.send(rows)
   } catch (error) {
      console.log(error)
      res.send("une erreur est servenue")
   }
})


app.delete("/supprimer/:id",async(req,res)=>{
   
     try {
     
         const query1=`select * from User where id=${req.params.id}`

         const resultat=await pool.query(query1)
         
         if(resultat[0].length==0){
             res.send("aucun utilisateur possede cet ID")

             return 
         }

         const query2=`delete from User where id=${req.params.id}`

         await pool.query(query2)
         
         res.send("good")
     } catch (error) {
         console.log(error)

         res.send("une erreur est servenue")

     }

})


app.listen(4000, () => console.log("http://localhost:4000"));