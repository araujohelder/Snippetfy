module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('User', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  });
  return Session;
};
