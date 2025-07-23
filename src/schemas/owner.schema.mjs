import mongoose from "mongoose"

const ownerSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    phone: {
        type: String,
        required: [ true, 'El teléfono es obligatorio' ],
    },
    email: {
        type: String,
        required: [ true, 'El correo electrónico es obligatorio' ],
        unique: true,
        match: [ /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Por favor ingrese un correo electrónico válido' ]
    }
}, { timestamps: true } )

const owner = mongoose.model( 'owner', ownerSchema )

export default owner 