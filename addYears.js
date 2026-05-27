const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./src/mockData.json', 'utf8'));

const assignYears = (arr, startYear = 2026) => {
  if(!arr) return;
  let year = startYear;
  arr.forEach((item, index) => {
    if(!item.year) {
      item.year = year.toString();
    }
    if ((index + 1) % 3 === 0) year -= 1;
  });
};

assignYears(data.awards, 2025);
assignYears(data.grants, 2024);
assignYears(data.memberships, 2026);
assignYears(data.reviewerCertificates, 2026);

Object.keys(data.documents).forEach(key => {
  assignYears(data.documents[key], 2026);
});

fs.writeFileSync('./src/mockData.json', JSON.stringify(data, null, 2));
console.log("Years added.");
