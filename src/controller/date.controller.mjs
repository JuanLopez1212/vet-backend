import dateModel from "../schemas/date.schema.mjs";
import vet from "../schemas/vet.schema.mjs";

const createDate = async (req, res) => {
    try {
        const { pet, reason, date, vet, state } = req.body
        
        if ( !pet || !reason || !date || !vet || !state ) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        if ( ![ 'pending', 'completed', 'cancelled' ].includes( state ) ) {
            return res.status(400).json({ message: "Estado inválido" });
        }

        const newDate = new dateModel( { pet, reason, date, vet, state } );
        const savedDate = await newDate.save();
        return res.status(201).json(savedDate);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear la cita" });
    }
}

const getAllDates = async (req, res) => {
    try {
        const state = req.query.state
        
        const filter = state ? { state } : {}

        const dates = await dateModel.find( filter ).populate([ 'pet', 'vet' ]).populate({
            path: 'pet',
            populate: { path: 'owner' }
        })
        return res.status(200).json(dates);
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener las citas" });   
    }
}

const getDateById = async ( req, res ) => {
    try {
        const dates = await dateModel.findById( req.params.id )
        if ( !dates ) {
            return res.status( 404 ).json( { message: 'Cita no encontrada' } )
        }
        res.status( 200 ).json( dates )
    } 
    catch (error) {
        console.error( error )
        res.status( 500 ).json( { message: 'Error al obtener la cita' } )
    }
}

const updateDate = async ( req, res ) => {
    try {
        const { id } = req.params
        const { state } = req.body

        if ( ![ 'pending', 'completed', 'cancelled' ].includes( state ) ) {
            return res.status( 400 ).json( { message: 'Estado inválido' } )
        }

        const updatedDate = await dateModel.findByIdAndUpdate( id, { state }, { new: true } )
        if ( !updatedDate ) {
            return res.status( 404 ).json( { message: 'Cita no encontrada' } )
        }
        res.status( 200 ).json( updatedDate )
    } 
    catch (error) {
        console.error( error )
        res.status( 500 ).json( { message: 'Error al actualizar la cita' } )
    }
}

const deleteDate = async ( req, res ) => {
    try {
        const deleteDate = await dateModel.findByIdAndDelete ( req.params.id )
        if ( !deleteDate ) {
            return res.status( 404 ).json( { message: 'Cita no encontrada' } )
        }
        res.status( 200 ).json ( { message: 'Cita eliminada correctamente' } )
    } 
    catch (error) {
        console.error ( error )
        res.status ( 500 ).json ( { message: 'Error al eliminar la cita' } )
    }
}

export {
    createDate,
    getAllDates,
    getDateById,
    updateDate,
    deleteDate
}