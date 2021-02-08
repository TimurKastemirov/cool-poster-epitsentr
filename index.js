const csv = require('csv-parser');
const fs = require('fs');
const converter = require('json-2-csv');
const {
    json2csvOptions,
    csvImageFieldNames,
    oldPriceListBySize,
    weightListBySize,
    sizeRegex,
} = require('./constants');
const { descUa, descRu } = require('./description');

const results = [];
let product, productImages,
    productSizeDependProps,
    size, height, width;
let count = 1;

fs.createReadStream('csv-prepared.csv')
    .pipe(csv())
    .on('data', (data) => {
        // reset variables after previous step
        size = height = width = 0;
        productImages = [];

        try {
            size = data.title.match(sizeRegex)[0];
            [height, width] = size.split('x').map(num => Number(num) * 10);
        } catch (e) {
            // console.log(data);
        }

        csvImageFieldNames.forEach(prop => {
            if (data[prop]) {
                productImages.push(data[prop]);
            }
        });

        product = {
            count,
            nameRu: 'ПОСТЕР В РАМКЕ ' + data.title,
            nameUa: 'ukr title',
            artikul: data.id,
            price: data.price,
            imgs: productImages.join(';\n'),
            availability: 'В наявності',
            brand: 'COOL POSTER',
            category: 'Скретч-карти і постери',
            madeId: 'Україна',
            length: 50,
        };

        if (size && size.length > 0) {
            productSizeDependProps = {
                oldPrice: oldPriceListBySize[size],
                descriptionRu: descRu(size),
                descriptionUa: descUa(size),
                height,
                width,
                weight: weightListBySize[size]
            };
            Object.assign(product, productSizeDependProps);
        }

        results.push(product);
        count++;
    })
    .on('end', () => {
        converter.json2csv(results, (err, csv) => {
            if (err) {
                console.log(err.message);
            }

            fs.writeFileSync('./result.csv', csv);
        }, json2csvOptions);
    });
