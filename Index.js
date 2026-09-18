const express = require("express");
const app = express();
const cors = require('cors');


app.use(cors());


app.get("/", (req, res) => {
  res.send("Hello World !");
});


app.post("/tester/",(req,res)=>{
    console.log("hey")
    const tableau=[]
    for(let i=0;i<10;i++){
        tableau.push("exemple"+i)
    }

     res.send(tableau)
})



app.listen(4000, () => console.log("http://localhost:4000"));