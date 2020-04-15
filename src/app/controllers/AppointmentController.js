import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, subHours } from 'date-fns';
import User from '../models/User';
import Store from '../models/Store';
import Appointment from '../models/Appointment';

class AppointmentController {

    async store(req, res){
        const schema = Yup.object().shape({
            id_store: Yup.number().required(),
            date: Yup.date().required()
        });

        if( !(schema.isValid(req.body)) ){
            return res.status(400).json({error: "data is not valid"});
        }

        const storeExists = await Store.findByPk(req.body.id_store);

        if(!storeExists){
            return res.status(400).json({error: "store is not valid"});
        }

        const { id_store, date } = req.body;

        const id_user = req.userId;

        const hourStart = startOfHour(parseISO(date));

        if(isBefore(hourStart, new Date())){
            return res.status(400).json({error: "past dates are not permitted"});
        }

        const checkAvailable = await Appointment.findOne({
            where: {
                id_store,
                date: hourStart
            }
        });

        if(checkAvailable){
            return res.status(400).json({error: "Appointment date is not available"});
        }

        const appoint = await Appointment.create({
            id_user,
            id_store,
            date: hourStart
        });

        return res.json(appoint);
    }

    async index(req, res){
        const appointments = await Appointment.findAll({
            where: { id_user: req.userId },
            order: ['date'],
            attributes: ['id', 'date', 'confirmed'],
            include: [
                {
                    model: Store,
                    as: 'store',
                    attributes: ['id', 'address'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'name']
                        }
                    ]
                }
            ]
        });

        return res.json(appointments);
    }

    async update(req, res){
        const appointment = await Appointment.findByPk(req.params.id);

        if(appointment.id_user != req.userId){
            return res.status(401).json({error: "Operation not allowed"});
        }

        if(isBefore(appointment.date, new Date())){
            return res.status(401).json({error: "Operation not allowed"});
        }

        appointment.confirmed = true;

        await appointment.save();

        return res.json(appointment);

    }

}

export default new AppointmentController();
