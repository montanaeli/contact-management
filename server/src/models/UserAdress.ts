
module.exports = (sequelize: any, DataTypes: any, User: any) => {
    const UserAdress = sequelize.define("userAdress", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: true,
            }
        },
    });

    User.hasMany(UserAdress, { foreignKey: 'userId', as: 'user' });
    UserAdress.belongsTo(User, { foreignKey: 'userId', as: 'user' });

    return UserAdress;
}