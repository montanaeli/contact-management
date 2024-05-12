module.exports = (sequelize: any, DataTypes: any, Contact: any) => {
    const ContactAdress = sequelize.define("contactAdress", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        contactId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Contact,
                key: 'id'
            },
        },
        adress: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
    });

    Contact.hasMany(ContactAdress, { foreignKey: 'userId', as: 'user' });
    ContactAdress.belongsTo(Contact, { foreignKey: 'userId', as: 'user' });

    return ContactAdress;
}