const https = require('https');
const fs = require('fs');

https.get('https://drvirendra-shete.in', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('drvirendra-shete-in.html', data);
    console.log('Saved to drvirendra-shete-in.html');
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
