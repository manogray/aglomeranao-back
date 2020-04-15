import * as Yup from 'yup';
import User from '../models/User';
import Store from '../models/Store';

class StoreController {

    async store(req, res){
        const schema = Yup.object().shape({
            id_user: Yup.string().required(),
            address: Yup.string().required()
        });

        if ( !(await schema.isValid(req.body)) ){
            return res.status(400).json({error: 'data is not valid'});
        }

        const userExists = await User.findByPk(req.body.id_user);

        if(!userExists){
            return res.status(400).json({error: 'user is not valid'});
        }

        const { id, address, people_number, grade } = await Store.create(req.body);

        return res.json({
            id,
            address,
            people_number,
            grade
        });
    }

    async index(req, res){
        const stores = await Store.findAll({
            order: ['people_number'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [ 'id', 'name' ]
                }
            ]
        });

        return res.json(stores);
    }

}

export default new StoreController();
