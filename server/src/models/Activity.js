const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Activities', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // type: {
    //   type: DataTypes.ENUM('Aventura', 'Bienestar', 'Cultural', 'Deportivo', 'Ecoturismo', 'Gastronómico', 'Negocios', 'Playa', 'Religioso'),
    //   allowNull: true,
    // },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    durationHours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    season: {
      type: DataTypes.ENUM('Primavera', 'Verano', 'Otoño', 'Invierno','primavera', 'verano', 'otoño', 'invierno'," no season"),
      allowNull: true,
    },
  }, {
    timestamps: false,
  });
};