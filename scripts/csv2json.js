const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const file = process.argv[2];
const results = {
  size: [],
  style: [],
  type: []
};

fs.createReadStream(file)
  .pipe(csv())
  .on('data', (data) => {
    for (const p in data) {
      if (Object.prototype.hasOwnProperty.call(data, p)) {
        const key = p.toLowerCase();

        if (data[p]) {
          if (results[key]) {
            results[key].push(data[p])
          } else {
            results[key] = [data[p]];
          }
        }
      }
    }
  })
  .on('end', () => {
    for (const k in results) {
      if (Object.prototype.hasOwnProperty.call(results, k)) {
        results[k].sort();
      }
    }

    fs.writeFileSync(
      path.resolve(path.join(__dirname, '../src/assets/data/words.json')),
      JSON.stringify(results, null, 2),
      'utf8'
    );
  });
