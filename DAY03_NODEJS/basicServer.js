import express from 'express';
const app = express();
app.get("/",(req,res)=> {
  res.send('Welcome to my hotel! How can I help you?');
})
//pizza endpoint request from usser
app.get("/pizza",(req,res)=> {
    const pizza = {
        name : "Mageritta Pizza ",
        size : "medium",
        quantity : "1"
    }
    //express js automatically converts the obejct into json string
    res.send(pizza);
})
// Idli endpoint: /idli
app.get("/idli", (req,res) => {
    res.send("'Here is your delicious idli with sambar!");
})

//Customize IDLI
app.get("/cusidli",(req,res)=>{
    var customizedIDLI = {
        name : "rava idli",
        size : "10cm Diameter",
        is_sambar  : true,
        is_chutney : false,
        incredient : ["RAVA","SALT","ETC"]
    }
    res.send(customizedIDLI);
    //   res.send(customizedIDLI.incredient[1])
    // res.send(customizedIDLI.name);
})
// Custom endpoint: /chicken
app.get('/chicken', (req, res) => {
    res.send('Here is your spicy chicken curry!');
});
app.listen(3000,() => {
    console.log(`Server is running on port ${3000}`)
})