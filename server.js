const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const {headers, url, method} = req;
    // res.setHeader("content-type", "text/plain")
    res.setHeader("content-type", "text/html")

    if(url === '/') {
        res.write('<h1>Welcome to our new online shop</h1>');
        res.write(`<br><br>Login hiihiin tuld <a href="/login">End darna uu</a>`);
        res.end();
    } else if(url === '/login') {
        res.statusCode = 200;
    // login form html butsaana
    res.write('<h1>Login hiih</h1>');
    res.write(`<form action = "logincheck" method = "POST">`);
    res.write(`<br><br><input type = "text", name = "email"/>`);
    res.write(`<br><input type = "password", name = "password"/>`);
    res.write(`<br><input type = "submit", value = "Login"/>`);
    res.write(`<form/>`);
    res.end();
    } else if(url === "/logincheck" && method === "POST") {
    // login check buyu usename pasword 2-iih huleej avdag neg hayg baih 
    res.statusCode = 200;
    res.write('<h1>Login hiij uzlee...</h1>');
    res.write('<br><h1>' + method + '</h1>');
    res.end();
    
    } else if(url === '/home') {
    // login hiisnii daraa usreh heseg
    } else {
      res.statusCode = 404;
      res.write('<h1>404 not found</h1>');
      res.end();
    }

    // console.log(`Headers ===>`, headers);
    // console.log(`URL ===> ${url}`);
    // console.log(`Method ===> ${method}`);
    // console.log(req.headers, req.url, req.method);
});

server.listen(5000, () => {
    console.log('http сэрвэр: 5000 порт дээр аслаа...');
})