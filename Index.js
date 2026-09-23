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





app.post("/Ajouter/",async(req,res)=>{
    const body=req.body;

    if(!body.name) {
        res.send("tous les champs sont reduis")
        return 
    }

    const {name}=body

    const query=`insert into User (name) values ("${name}")`

    try {
        await pool.query(query)
        res.send("opération passée avec succes")
    } catch (error) {
        console.log(error)
        res.send("une erreur est servenue")
    }
})




app.get("/recuperer/",async(req,res)=>{
   try {
      const [rows]=await pool.query("select * from User")

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


app.delete("/supprimer1/",async(req,res)=>{
    try {
        const query="delete from User"

        await pool.query(query)

        res.send("opération passée avec succes")
    } catch (error) {
        res.send("une erreur est servenue")
    }
})




app.post("/tester888/",async(req,res)=>{
    console.log(req.body)
    const Aux={...req.body,propr:"1111"}
    res.send(Aux);
})


const tester=(req,res,next)=>{
    console.log(req.params)
    if(!req.params.nombre){
        res.send("ressayer")
    }else {
        next()
    }
}



app.get("/getById/:Exemple/:id1",tester,async(req,res)=>{
   const idUser=req.params.id;
   const sql=`select * from User where id=${idUser}`;
   try {
      const [rows]=await pool.query(sql);

      console.log(rows)

      res.send(rows)
   } catch (error) {
      console.log(error)
      res.send("une erreur est servenue")
   }
    

})



app.get("/NombreUsers/",async(req,res)=>{
    const sql="select count(*) from User"

    try{
        const [rows]=await pool.query(sql);

        console.log(rows[0])

        res.send(rows[0])
    }catch(error){
        console.log(error)
        res.send("une erreur est servenue")
    }
})




app.listen(4000, () => console.log("http://localhost:4000"));