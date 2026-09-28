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


app.use(cors())
app.use(express.json());

app.use((err, req, res, next) => {
   
  if (err.type === 'entity.parse.failed') {
    return res.send("erreur format"); 
  }
  next(err);
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


app.post("/tester99/",async(req,res)=>{
   const body=req.body;

   if(!body.propr1 || !body.propr2){
      res.send("veuillez saisir tous les champs")
      return 
   }

   const sql1=`select * from Exemple where propr1="${body.propr1}" and propr2="${body.propr2}"`

   try {
      const [rows]=await db.query(sql1)

      console.log(rows)
      
      if(rows.length)
        res.send(rows)
      else
        res.send("aucun element")
   } catch (error) {
      console.log(error)
      res.send("une erreur est servenue")  
   }
})


app.post("/Ajouter11/",async(req,res)=>{
   const body=req.body
   console.log(req.body)
   

   if(!body.propr1 || !body.propr2){
       res.send("veuillez saisir tous les champs")
       return
   }
   
   const sql1=`insert into Exemple(propr1,propr2) values ("${body.propr1}","${body.propr2}")`
   try {
      await db.query(sql1)

      res.send("l'opération est passée avec succes")
   } catch (error) {
       console.log(error)
       res.send("uneerreur est servenue")
   }

})



app.delete("/Supprimer22/",async(req,res)=>{
    const sql1="delete from Exemple"

    try {
       await db.query(sql1)

       res.send("l'opération est passée avec succes")
    } catch (error) {
       console.log(error)
       res.send("une erreur est servenue")
    }
})



app.get("/GetExemples/",async(req,res)=>{
  const sql1="select * from Exemple"

  try {
     const [rows]=await db.query(sql1)
      
     if(rows.length==0) return res.send("la liste est vide")

     res.send(rows)
  } catch (error) {
     console.log(error)
     res.send("une erreur est servenue")
  }
})

app.use((req, res) => {
  console.log("hello")
  res.send("aucune route")
});

app.listen(4000, () => console.log("http://localhost:4000"));