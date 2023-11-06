const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  const Dog = sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Dog.associate = (models) => {
    Dog.belongsToMany(models.Temperaments, {
      through: 'Dog_Temperaments', 
      foreignKey: 'dogId',
    });
  };

  return Dog;
};