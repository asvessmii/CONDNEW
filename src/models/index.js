// In-memory data store replacing Sequelize models
const products = [
  {
    id: 1,
    name: 'Daikin FTXB35C',
    shortDescription: 'Инверторная сплит-система, до 35 м²',
    fullDescription: 'Инверторная сплит-система Daikin FTXB35C',
    technicalSpecs: JSON.stringify({ power: '3.5 кВт', noise: '19 дБ' }),
    price: 49900,
    photoThumb: 'https://i.imgur.com/primer1.jpg',
    photoFull: 'https://i.imgur.com/primer1_large.jpg'
  },
  {
    id: 2,
    name: 'LG Mega Plus P07SP',
    shortDescription: 'Настенный кондиционер, до 20 м²',
    fullDescription: 'Настенный кондиционер LG Mega Plus P07SP',
    technicalSpecs: JSON.stringify({ power: '2.2 кВт', noise: '18 дБ' }),
    price: 42500,
    photoThumb: 'https://i.imgur.com/primer2.jpg',
    photoFull: 'https://i.imgur.com/primer2_large.jpg'
  },
  {
    id: 3,
    name: 'Mitsubishi Electric MSZ-FH25VE',
    shortDescription: 'Инверторный, до 25 м²',
    fullDescription: 'Сплит-система Mitsubishi Electric MSZ-FH25VE',
    technicalSpecs: JSON.stringify({ power: '2.5 кВт', noise: '19 дБ' }),
    price: 55000,
    photoThumb: 'https://i.imgur.com/primer3.jpg',
    photoFull: 'https://i.imgur.com/primer3_large.jpg'
  },
  {
    id: 4,
    name: 'Samsung AR12TXFYAWKNEU',
    shortDescription: 'Мульти-сплит, до 30 м²',
    fullDescription: 'Сплит-система Samsung AR12TXFYAWKNEU',
    technicalSpecs: JSON.stringify({ power: '3.5 кВт', noise: '20 дБ' }),
    price: 47900,
    photoThumb: 'https://i.imgur.com/primer4.jpg',
    photoFull: 'https://i.imgur.com/primer4_large.jpg'
  }
];

const projects = [
  {
    id: 1,
    title: 'Монтаж Daikin FTXB35C на Невском',
    description: 'Демонтаж старого блока и установка нового',
    address: 'г. Санкт-Петербург, Невский пр., д. 10',
    photos: JSON.stringify([
      'https://i.imgur.com/about1_1.jpg',
      'https://i.imgur.com/about1_2.jpg'
    ]),
    sortOrder: 1
  },
  {
    id: 2,
    title: 'Установка мульти-сплит Samsung',
    description: 'Монтаж трёх внутренних блоков и одного наружного',
    address: 'г. Санкт-Петербург, Московский пр., д. 42',
    photos: JSON.stringify([
      'https://i.imgur.com/about2_1.jpg',
      'https://i.imgur.com/about2_2.jpg'
    ]),
    sortOrder: 2
  }
];

const feedbacks = [];
const carts = new Map();

module.exports = {
  products,
  projects,
  feedbacks,
  carts
};
