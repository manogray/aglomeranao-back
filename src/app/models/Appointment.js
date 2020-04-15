import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
    static init(sequelize){
        super.init(
            {
                date: Sequelize.DATE,
                confirmed: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            },
        );

        return this;
    }

    static associate(models){
        this.belongsTo(models.User, { as:'user', foreignKey: 'id_user' });
        this.belongsTo(models.Store, { as:'store', foreignKey: 'id_store' });
    }
}

export default Appointment;