import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const writeError = (res) => {
    res.writeHead(500, {'Content-Type' : 'text/plain'});
    res.end('server error');
}

export default function html2(req, res){
    const filePath = path.join(__dirname, 'html2.html');
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if(err){
            writeError(res);
            return;
        }
        
        fs.stat(filePath, (err, stats) => {
            if(err || !stats.isFile()){
                writeError(res);
                return;
            }
            
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': stats.size
            });

            const stream = fs.createReadStream(filePath);
            stream.on('error', (err) => {
                if(!res.headersSent){
                    writeError(res);
                }
            });

            stream.pipe(res);
        });
    });
}