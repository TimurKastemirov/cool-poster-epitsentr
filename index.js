const csv = require('csv-parser');
const fs = require('fs');

const results = [];
let counter = 0;

fs.createReadStream('csv-prepared.csv')
    .pipe(csv())
    .on('data', (data) => {
        // console.log(data);
        if (counter < 5) {
            results.push(data);
        }
        counter++;
    })
    .on('end', () => {
        fs.writeFileSync('./qqq.json', JSON.stringify(results));
    });
