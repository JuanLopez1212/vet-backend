import mongoose from "mongoose"

const vetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    email: {
        type: String,
        required: [ true, 'El email es obligatorio' ],
        unique: true,
        match: [ /.+\@.+\..+/, 'Por favor ingrese un email válido' ]
    },
    phone: {
        type: String,
        required: [ true, 'El teléfono es obligatorio' ],
        match: [ /^\d{10}$/, 'El teléfono debe tener 10 dígitos' ]
    }
})

const vet = mongoose.model( 'vet', vetSchema )

export default vet