import dotenv from 'dotenv';
import Sequelize from 'sequelize';

import User from '../app/models/User';
import Store from '../app/models/Store';
import Appointment from '../app/models/Appointment';

dotenv.config();

const models = [User, Store, Appointment];

class Database {
    constructor(){
        this.init();
    }

    init(){
        this.connection = new Sequelize(process.env.DATABASE_URL || process.env.DEV_DATABASE_URL, {
            define: {
                timestamps: true,
                underscored: true,
                underscoredAll: true
            }
        });

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();