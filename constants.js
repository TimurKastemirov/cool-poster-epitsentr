const json2csvOptions = {
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
const csvImageFieldNames = [
    'image_link',
    'additional_image_link0',
    'additional_image_link1',
    'additional_image_link2',
];
const oldPriceListBySize = {
    '21x30': 21,
    '30x40': 30,
    '40x50': 40,
    '50x70': 50,
};
const weightListBySize = {
    '21x30': 800,
    '30x40': 1100,
    '40x50': 1600,
    '50x70': 2000,
};
const sizeRegex = /\d{2}x\d{2}/;

module.exports = {
    json2csvOptions,
    csvImageFieldNames,
    oldPriceListBySize,
    weightListBySize,
    sizeRegex,
};
