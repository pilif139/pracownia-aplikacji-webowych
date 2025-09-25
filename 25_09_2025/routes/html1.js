export default function html1(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HTML Page 1</title>
    </head>
    <body>
        <h1>xd</h1>
    </body>
    </html>`;
    res.end(htmlContent);
}