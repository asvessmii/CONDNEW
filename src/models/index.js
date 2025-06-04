const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  ssl: { rejectUnauthorized: false }
});

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  shortDescription: DataTypes.TEXT,
  fullDescription: DataTypes.TEXT,
  technicalSpecs: DataTypes.TEXT,
  price: DataTypes.INTEGER,
  photoThumb: DataTypes.TEXT,
  photoFull: DataTypes.TEXT
});

const CartItem = sequelize.define('CartItem', {
  userId: DataTypes.BIGINT,
  productId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  priceAtAdd: DataTypes.INTEGER
});

const Feedback = sequelize.define('Feedback', {
  userId: DataTypes.BIGINT,
  name: DataTypes.STRING,
  phone: DataTypes.STRING,
  address: DataTypes.TEXT,
  services: DataTypes.TEXT,
  comment: DataTypes.TEXT
});

const Project = sequelize.define('Project', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  address: DataTypes.STRING,
  photos: DataTypes.TEXT,
  sortOrder: DataTypes.INTEGER
});

module.exports = {
  sequelize,
  Product,
  CartItem,
  Feedback,
  Project
};
