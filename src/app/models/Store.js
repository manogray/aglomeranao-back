import Sequelize, { Model } from 'sequelize';

class Store extends Model {
    static init(sequelize){
        super.init(
            {
                address: Sequelize.STRING,
                grade: Sequelize.INTEGER,
                people_number: Sequelize.INTEGER,
            },
            {
                sequelize,
            },
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.User, { as:'user', foreignKey: 'id_user' });
    }
}

export default Store;