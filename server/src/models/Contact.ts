module.exports = (sequelize: any, DataTypes: any, User: any) => {
    const Contact = sequelize.define("contact", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: true,
            }
        },
        title: {
            type: DataTypes.STRING,
        },
        profilePicture: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
        },
    });

    User.hasMany(Contact, { foreignKey: 'userId', as: 'contactUser' });
    Contact.belongsTo(User, { foreignKey: 'userId', as: 'contactUser' });

    return Contact;
}