let jsonString = { 
     "name": "Alice",
     "age": 25, 
     "hobbies": ["reading","playing guitar","sports","painting"]
}
console.log(jsonString.age);

let obj = {
    title : "Pyschology Of Money",
    pages : 200
}
//converting the book obj into JSON String 
bookJSONStr = JSON.stringify(obj);
console.log(bookJSONStr);


//converting JSON string into again back to obj string
let JSONstr =  JSON.parse(bookJSONStr);
console.log(JSONstr);

// a) Define JSON and explain its importance in web development.
// b) Given a JSON data string: {"name": "Alice", "age": 25, "hobbies": ["reading",
// "painting"]}, explain how you would extract the value of the "age" key.
// c) How would you convert the following object into a JSON data string? {"title": "Book", "pages":
// 200

// //ANS 
// a) JSON (JavaScript Object Notation) is a lightweight data interchange format used to exchange data between
// a server and a client. It's easy for humans to read and write, and it's easy for machines to parse and generate.