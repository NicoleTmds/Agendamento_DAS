'use strict';
const { 
  Model, DataTypes 
} = require('sequelize');
module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller', onDelete: 'CASCADE' });
      Product.hasMany(models.ProductCart, { foreignKey: 'productId', as: 'cartItems', onDelete: 'CASCADE' });
    }
  }
  Product.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: false },
      color: { type: DataTypes.STRING, allowNull: false },
      stock: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      sellerId: { type: DataTypes.INTEGER, allowNull: false },
      imageUrl: { type: DataTypes.STRING },
    },
    { sequelize, 
      modelName: 'Product',
      tableName: 'Product'
    }
  );

  return Product;
};