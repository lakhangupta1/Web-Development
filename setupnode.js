let a=20;
// console.log(a);
const fs=require('fs');
fs.writeFileSync("hello.txt","this is my first file to create  new things ");// to create new file .
 
const http=require('http');
http.createServer((request,response)=>{
    response.write("<h1>this is  heading for server </h1>")
    response.end();
}).listen(3000);