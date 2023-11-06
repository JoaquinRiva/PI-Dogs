const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Temperaments = sequelize.define('Temperaments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Temperaments.associate = (models) => {
    Temperaments.belongsToMany(models.Dog, {
      through: 'Dog_Temperaments',
      foreignKey: 'temperamentsId',
    });
  };

  return Temperaments;
};