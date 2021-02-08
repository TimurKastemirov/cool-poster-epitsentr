const csv = require('csv-parser');
const fs = require('fs');
const converter = require('json-2-csv');

const results = [];
let product;
let productSizeDependProps;
let size;
const oldPrices = {
    '21x30': 21,
    '30x40': 30,
    '40x50': 40,
    '50x70': 50,
};
const weightList = {
    '21x30': 800,
    '30x40': 1100,
    '40x50': 1600,
    '50x70': 2000,
};

function descRu(size) {
    return `Размер постера - ${size} см.
Если Вам нужен другой размер, введите в поиске название постера и Вы увидите все его размеры.
Постер напечатан на профессиональной матовой фотобумаге плотностью 180 г.
Постер будет бережно вставлен в белую пластиковую рамочку. Вам останиется только повесить ее на стену. В рамке есть крепежи, за которые рамку можно крепить на гвоздь или крючек.
Если Вам нужна рамка другого цвета, сообщите нам при подвтерждении заказа по телефону и мы сделаем нужный цвет.`;
}

function descUa(size) {
    return `Розмір постера - ${size} см.
Якщо Вам потрібен інший розмір, введіть в пошуку назву постера і Ви побачите всі його розміри.
Постер надрукований на професійному матовому фотопапері щільністю 180 г.
Постер буде дбайливо вставлений в білу пластикову рамочку. Вам залишиться тільки повісити її на стіну. У рамці є кріплення, за які рамку можна кріпити на цвях або гачок.
Якщо Вам потрібна рамка іншого кольору, повідомте нам про це при подвтерждені замовлення по телефону і ми зробимо потрібний колір.`;
}

const sizeRegex = /\d{2}x\d{2}/;
let height, width;
let count = 1;
const imageProps = [
    'image_link',
    'additional_image_link0',
    'additional_image_link1',
    'additional_image_link2',
];

fs.createReadStream('csv-prepared.csv')
    .pipe(csv())
    .on('data', (data) => {
        size = height = width = 0; // initiate variables

        try {
            size = data.title.match(sizeRegex)[0];
            [height, width] = size.split('x').map(num => Number(num) * 10);
        } catch (e) {
            // console.log(data);
        }

        product = {
            count,
            nameRu: data.title,
            nameUa: 'ukr title',
            artikul: data.id,
            price: data.price,
            imgs: [],
            availability: 'В наявності',
            brand: 'COOL POSTER',
            category: 'Скретч-карти і постери',
            madeId: 'Україна',
            length: 50,
        };

        imageProps.forEach(prop => {
            if (data[prop]) {
                product.imgs.push(data[prop]);
            }
        });
        product.imgs = product.imgs.join(';\n');

        if (size && size.length > 0) {
            productSizeDependProps = {
                oldPrice: oldPrices[size],
                descriptionRu: descRu(size),
                descriptionUa: descUa(size),
                height,
                width,
                weight: weightList[size]
            };
            Object.assign(product, productSizeDependProps);
        }

        results.push(product);
        count++;
    })
    .on('end', () => {
        const options = {
            keys: [
                {
                    field: 'count',
                    title: '№',
                },
                {
                    field: 'nameRu',
                    title: 'Название товара на RU',
                },
                {
                    field: 'nameUa',
                    title: 'Название товара на UA',
                },
                {
                    field: 'artikul',
                    title: 'Артикул',
                },
                {
                    field: 'price',
                    title: 'Цена',
                },
                {
                    field: 'oldPrice',
                    title: 'Старая цена',
                },
                {
                    field: 'descriptionRu',
                    title: 'Описание на RU',
                },
                {
                    field: 'descriptionUa',
                    title: 'Описание на UA',
                },
                {
                    field: 'imgs',
                    title: 'Фото товара',
                },
                {
                    field: 'availability',
                    title: 'Наличие',
                },
                {
                    field: 'brand',
                    title: 'Бренд',
                },
                {
                    field: 'category',
                    title: 'Категория товара',
                },
                {
                    field: 'madeId',
                    title: 'Страна производитель',
                },
                {
                    field: 'height',
                    title: 'Высота упаковки (мм)',
                },
                {
                    field: 'width',
                    title: 'Ширина упаковки (мм)',
                },
                {
                    field: 'length',
                    title: 'Длина упаковки (мм)',
                },
                {
                    field: 'weight',
                    title: 'Вес в упаковке  (г)',
                },
            ]
        };
        converter.json2csv(results, (err, csv) => {
            fs.writeFileSync('./result.csv', csv);
        }, options);
    });
