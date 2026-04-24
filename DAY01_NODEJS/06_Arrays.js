// Problem 4: Arrays
// You're organizing a party and want to keep track of the guest list. Create an array called
// "guestList" and add the names of at least five guests. Then, write a program that checks if a
// given name is on the guest list. If the name is found, display "Welcome to the party, [name]!";
// otherwise, display "Sorry, you're not on the guest list."
const prompt = require('prompt-sync')();
let nameToCheck = prompt("Enter You name: ");
const guestList = ["abhishek","rohit","shubham","tushar","ayush"];
if(guestList.includes(nameToCheck)){
    console.log("Welcome to the party "+ nameToCheck);
}else{
    console.log("Sorry, you're not on the guest list.");
}
// THIS ARE THE MISTAKES YOU DID, APPROCHES YOU TRIED
// for(let i = 0;i<guestList.length; i++){
//     if(guestList[i]==name){
//         console.log("Welcome to the party"+ name);
//     }else{
//         console.log("Sorry, you're not on the guest list.");
//     }
// }

// guestList.filter((currGuest) => currGuest = name);

