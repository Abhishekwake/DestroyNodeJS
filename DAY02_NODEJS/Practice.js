const fs = require('fs');
const os = require('os');
const userInfo = os.userInfo();
console.log(userInfo);
fs.writeFile("text.txt","Hello im txt written from writeFile method",(err)=>{
    if(err) console.log(err);
    console.log("Writing file succesfully done")
})
fs.readFile("./text.txt",(err,data)=> {
    if(err) console.log(err);
    console.log("reading file successfull done",data.toString());
})