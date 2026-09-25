const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require("mysql2/promise");


const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "2001HAJHOUJREALMADRID$$$$",
  database: "database11"
});





app.get("/recuperer/",async(req,res)=>{
   
   const sql1="select * from User"

   try {
       const resultat=await db.query(sql1)

       res.send(resultat[0])
   } catch (error) {
      console.log(error)
      res.send("une erreur est servenue")
   }
})


app.delete("/Supprimer/",async(req,res)=>{
   const sql1="delete from User"

   try {
      await db.query(sql1)
      res.send("opération passée avec succes")
   } catch (error) {
      console.log(error)
      res.send("une erreur est servenue")
   }
})


app.listen(4000, () => console.log("http://localhost:4000"));