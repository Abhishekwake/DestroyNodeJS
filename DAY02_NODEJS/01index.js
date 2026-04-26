//CORE NODEJS MODULES BUILT IN

//you dont need to install these via npm they come up with nodejs

//5.1 OS Module((OS System info))
const os = require('os');
const fs = require('fs');
const user =os.userInfo();
console.log(user);
// console.log(os);

// Prints current system usernam
// $ node index.js 
// [Object: null prototype] {
//   uid: -1,
//   gid: -1,
//   username: 'Abhishek',
//   homedir: 'C:\\Users\\91808',
//   shell: null
// }

// 5.2 FS Module (File System)
// Used to create, read, update, delete files.

// Example: Create a file and write content

fs.writeFile("temp.txt","Hello im txt file created by fs module built in",(err) => {
if(err) console.log(err);
console.log("file created successfully !");
})

// What happens:

// If file doesn't exist → creates it.
// If file exists → overwrites it