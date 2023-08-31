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
      type: DataTypes.ENUM('Spring', 'Summer', 'Autumn', 'Winter'),
      allowNull: true,
    },
  }, {
    timestamps: false,
  });
};