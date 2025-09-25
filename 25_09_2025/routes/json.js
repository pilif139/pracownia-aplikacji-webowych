export default function sendJson(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const response = {
        message: 'Hello world',
        xd: 123
    };
    res.end(JSON.stringify(response));
}