import { createServer } from 'http'
import { URL } from 'url';
import { readFile, writeFileSync } from 'fs'
import { dirname, join } from 'path'

const PORT = 8080;
const HOSTNAME = "localhost";

function index(req, res){
    const path = join("static", "index.html")
    readFile(path, 'utf-8', (err, data)=>{
        if(err){
            console.error(err);
            res.statusCode = 500;
            res.end("500. internal server error")
        }
        res.setHeader("Content-Type", "text/html")
        res.end(data);
    });
}

function kontakt(req, res){
    const path = join("static", "contact.html");
    readFile(path, "utf-8", (err, data)=>{
       if(err){
            console.error(err);
            res.statusCode = 500;
            res.end("500. internal server error")
        }
        res.setHeader("Content-Type", "text/html")
        res.end(data);
    })
}

function saveContact(res, params){
    console.log('params', params)
    const json = JSON.stringify(params)
    console.log('json', json)
    writeFileSync(`message_${Date.now()}.json`, json, (err) => {
        res.statusCode = 500;
        res.end("Error writing file!")
    });
}

function css(req, res){
   const path = join("static", "css", "style.css");
    readFile(path, "utf-8", (err, data)=>{
       if(err){
            console.error(err);
            res.statusCode = 500;
            res.end("500. internal server error")
        }
        res.setHeader("Content-Type", "text/css")
        res.end(data);
    }) 
}

const server = createServer((req, res) => {
    const url = new URL(req.url, `http://${HOSTNAME}:${PORT}`)
    
    switch(url.pathname){
        case "/":
            return index(req, res);
        case "/kontakt":
            if(url.searchParams.size){
                saveContact(res, Object.fromEntries(url.searchParams.entries()))
            }
            return kontakt(req, res);
        case "/css/style.css":
            return css(req, res);
        default:
            res.end(`not found for path ${url.pathname}`);
            break;
    }
})

server.listen(PORT, HOSTNAME, ()=>{
    console.log(`Server listening on http://${HOSTNAME}:${PORT}`)
});