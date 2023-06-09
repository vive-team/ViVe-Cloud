const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TouristAttraction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TouristAttraction.init({
    userId: {
      type: DataTypes.STRING,
      references: {
        model: {
          tableName: 'users',
          key: 'id',
        },
      },
    },
    touristAttractionId: {
      type: DataTypes.STRING,
      references: {
        model: {
          tableName: 'touristattractions',
          key: 'id',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'UserTouristAttraction',
  });
  return TouristAttraction;
};
