
import mongoose from "mongoose";

const petSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    type: {
        type: String, 
        required: [ true, 'El tipo de mascota es obligatorio' ]
    },
    race: {
        type: String,
        required: [ true, 'La raza es obligatoria' ]
    },
    age: {
        type: Number,
        required: [ true, 'La edad es obligatoria' ],
        min: [ 0, 'La edad no puede ser negativa' ]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'owner',
        required: [ true, 'El propietario es obligatorio' ]
    }    
}, {timestamps: true } )

const pet = mongoose.model ( 'pet', petSchema )

export default pet