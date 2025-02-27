const http = require('http');
const fs = require('fs');
const urlLib = require('url');
const path = require('path');
const { error } = require('console');

const server = http.createServer((req, res) => {
    const {headers, url, method} = req;
    // res.setHeader("content-type", "text/plain")
    res.setHeader("content-type", "text/html")

    if(url === '/') {
        fs.readFile('./src/index.html', "utf8", (error, data) => {
        if(error) {
            res.statusCode = 500;
            res.write('<h1>Унших явцад алдаа гарлаа</h1>');
            res.end();
            
        } else {
            res.statusCode = 200;
            res.write(data);
            res.end();

        }
        })
    } else if(url === '/login') {
        // login form html butsaana
        fs.readFile('./src/login.html', "utf8", (error, data) => {
        res.statusCode = 200;
        res.write(data);
        res.end();

        })
    } else if(url === "/logincheck" && method === "POST") {
        /*
         POST method-ийн body хэсэгт өгөгдөл маань явж байдаг.Тиймээс энд POST method-ийн дотор байгаа name, password гэсэн өгөгдлийг энд хэрхэн уншиж авах вэ? Өгөгдлүүдимйг сэрвэр талаас илгээхэд хэсэг хэсгээр илгээдэг. Тэр хэсгийг CHUNK гэж нэрлэдэг. Нийт CHUNK -ууд нь binary өгөгдөл байдаг буюу 0,1 гэсэн data байдлаар ирнэ.Эдгээр CHUNK -уудыг бүгдийг нь цуглуулаад string-руу хөрвүүлэхэд манай нэр болон нууц үг гарна.req.on() --- нь CHUNK ирэх болгонд event үүсэж req.on() функ нь ажиллах ба CHUNK event нь өөрийн гэсэн нэртэй байна. Тэр нэрийг нь data -*гэж нэрлэе. data - ирэх болгонд callBack function дуудагдана.

            req.on('data', () => {})
                Энэ callBack function-н аргументаар нь ирсэн Chunk орж ирнэ.
        */
    // login check buyu usename pasword 2-iih huleej avdag neg hayg baih 
    const body = [];
    req.on('data', (chunk) => {
     body.push(chunk)
    })
    // Энэ CHUNK хэзээ дуусахыг нь мэддэг тусдаа event-тэй
    req.on('end', () => {
       const parsedBody = Buffer.concat(body).toString();
       const password = parsedBody.split('=')[2];
       console.log('password ========= ' , password);
       if(password === 'naraa55') {
             // Login successfully
             res.statusCode = 302;
             res.setHeader("Location", "/home");
             
       } else {
             // Login failed
             res.statusCode = 302;
             res.setHeader("Location", "/error");
            }
            res.end();
            //    ирсэн өгөгдлийг файл руу save хийж үзье
    // fs.writeFileSync('loginInfo.txt', parsedBody);
    // res.write('Got your name and password');
    // res.end();
    })
    
    } else if(url === '/home') {
    // login hiisnii daraa usreh heseg
    fs.readFile('./src/home.html', "utf8", (error, data) => {
        res.statusCode = 200;
        res.write(data);
        res.end();
    })

    } else if(url === '/error') {
        // login hiisnii daraa usreh heseg
        fs.readFile('./src/error.html', "utf8", (error, data) => {
            res.statusCode = 200;
            res.write(data);
            res.end();
        })
    }
    else if (url.endsWith(".jpg") || url.endsWith(".png") ) {
        /*
        энэ тохиолдолд файлын нэрийг амархан уншиж авах арга нь nodejs-йин core library-д байдаг url and path -нь ийм string './src/img/cat.jpg' ---- орж ирвэл эндээс файлын нэрийг нь олох болон эсвэл манай төсөл яг диск дээр хаана байрлаж буй зэрэг ерөнхий фолдерыг нь олох зэрэгт ашигладаг. Эдгээрийг ашиглан дамжуулсан зурагны нэрийг гаргаж авна.
        */
       const parsed = urlLib.parse(url);
       const fileName = path.basename(parsed.pathname);
       console.log('-------------->', fileName);
       fs.readFile('./src/img/' +fileName, (error, data) => {
        res.statusCode = 200;
        res.setHeader("content-type", "image/jpg");
        res.end(data);
       });

    } else if (url.endsWith(".pdf")) {
        const parsed = urlLib.parse(url);
        const fileName = path.basename(parsed.pathname);
        console.log('-------------->', fileName);
        fs.readFile('./src/pdf/' +fileName, (error, data) => {
         res.statusCode = 200;
         res.setHeader("content-type", "application/pdf");
        //  https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types
         res.end(data);
        });
 

    } else if (url.endsWith(".css")) {
        const parsed = urlLib.parse(url);
        const fileName = path.basename(parsed.pathname);
        console.log('-------------->', fileName);
        fs.readFile('./src/css/' +fileName, (error, data) => {
         res.statusCode = 200;
         res.setHeader("content-type", "text/css");
        //  https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types
         res.end(data);
        });

    } else if (url.endsWith(".js")) {
        const parsed = urlLib.parse(url);
        const fileName = path.basename(parsed.pathname);
        console.log('-------------->', fileName);
        fs.readFile('./src/js/' +fileName, (error, data) => {
         res.statusCode = 200;
         res.setHeader("content-type", "	text/javascript");
        //  https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types
         res.end(data);
        });

    }
    // } else if(url === '/src/img/cat.jpg') {
    //     // Нийт 10 зураг орж ирвэл зураг болгон дээр ингэж оруулж ирнэ гэсэн үг тиймээс энэ нь маш хүндрэлтэй тул өөр аргаар хийж үзье.
    //     fs.readFile('./src/img/cat.jpg', (error, data) => {
    //         if (error) {
    //             res.statusCode = 500;
    //             res.write('<h1>Зураг уншихад алдаа гарлаа</h1>');
    //         } else {
    //             res.statusCode = 200;
    //             res.setHeader("content-type", "image/jpg")
    //             res.write(data);
    //         }
    //         res.end();
    //     });
  
     else {
      res.statusCode = 404;
      res.write('<h1>404 not found</h1>');
      console.log("======NOT FOUND======>", url);
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