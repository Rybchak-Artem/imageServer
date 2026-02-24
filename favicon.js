import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const favicon = readFileSync('C:\\Code\\faviconTrouble-main\\img\\black.jpg');
const imagePath = 'C:\\Code\\faviconTrouble-main\\img\\black.jpg';

const server = createServer((req, res) => {
  console.log(req.url)
  if(req.url === '/favicon.ico') {
    //open file and return it 
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(favicon);
    return;
  }
  
  // Обробка маршруту /img/ширина/висота (наприклад /img/100/100)
  const imgRegex = /^\/img\/(\d+)\/(\d+)$/;
  const match = req.url.match(imgRegex);
  
  if (match) {
    const width = parseInt(match[1], 10);
    const height = parseInt(match[2], 10);
    
    
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    
    sharp(imagePath)
      .resize(width, height, {
        fit: "cover",
        position: "center"
      })
      .jpeg({ quality: 80 })
      .pipe(res);
    return;
  }
  
  // Головна сторінка - виводить картинку розміром 100x100
  res.writeHead(301, { 'Location': '/img/100/100' });
  res.end();

});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
