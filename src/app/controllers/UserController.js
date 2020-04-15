import * as Yup from 'yup';
import User from '../models/User';

class UserController {

    async store(req, res){
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            confirmPassword: Yup.string().required().when('password', (password, field) => {
                password ? field.oneOf([Yup.ref('password')]) : field
            })
        });

        if ( !(await schema.isValid(req.body)) ){
            return res.status(400).json({error: 'data is not valid'});
        }

        const emailExists = await User.findOne({where: { email: req.body.email }})

        if(emailExists){
            return res.status(400).json({error: 'email already in use'});
        }

        const { id, name, email } = await User.create(req.body);

        return res.json({
            id,
            name,
            email
        });
    }

}

export default new UserController();
