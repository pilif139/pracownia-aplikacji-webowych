import http from 'http';
import html1 from './routes/html1.js';
import html2 from './routes/html2.js';
import sendJson from './routes/json.js';

const server = http.createServer((req, res) => {
    switch(req.url){
        case '/':
            if(req.method === 'GET'){
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain;charset=utf-8',);
                res.end('Strona główna\n');
            }
            break;
        case '/json':
            sendJson(req, res);
            break;
        case '/html1':
            html1(req, res);
            break;
        case '/html2':
            html2(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain;charset=utf-8',);
            res.end('Not Found\n');
            break;
    }
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});