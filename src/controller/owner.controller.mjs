import owner from '../schemas/owner.schema.mjs'

const createOwner = async ( req, res ) => {
    try {
        const { name, phone, email } = req.body
        
        if ( !name || !phone || !email ) {
            res.status( 400 ).json ( { message: 'Todos los campos son obligatorios' } )
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if ( !emailRegex.test( email ) ) {
            return res.status( 400 ).json( { message: 'Por favor ingrese un correo electrónico válido' } )
        }

        const newOwner = new owner( { name, phone, email } )
        const savedOwner = await newOwner.save()

        res.status( 201 ).json( savedOwner )
    } 
    catch (error) {
        console.error( error )
        res.status( 500 ).json( { message: 'Error al crear el propietario' } )
    }
}

const getAllOwners = async ( req, res ) => {
    try {
        const owners = await owner.find()
        res.status( 200 ).json( owners )    
    } 
    catch (error) {
        console.error( error )
        res.status( 500 ).json( { message: 'Error al obtener los propietarios' } )
    }
}

const deleteOwner = async ( req, res ) => {
    try {
        const ownerId = req.params.id
        const deletedOwner = await owner.findByIdAndDelete( ownerId )

        if ( !deletedOwner ) {
            return res.status( 404 ).json( { message: 'Propietario no encontrado' } )
        }

        res.status( 200 ).json( { message: 'Propietario eliminado correctamente' } )    
    } 
    catch (error) {
        console.error ( error )
        res.status( 500 ).json( { message: 'Error al eliminar el propietario' } )
    }
}

export {
    createOwner,
    getAllOwners,
    deleteOwner
}