// Problem 5: Using 'os' Module
// Create a Node.js program that uses the os module to display the following system
// information:
// ● Total memory available (in bytes)
// ● Free memory available (in bytes)
// ● Operating system platform
// ● Numberof CPUcores

const os = require('os');
const userInfo= os.userInfo();
console.log(userInfo);
console.log("Total Memory",os.totalmem())
console.log("Free Memory:",os.freemem());
console.log("Platform",os.platform());
console.log("Number of CPU Cores",os.cpus().length)