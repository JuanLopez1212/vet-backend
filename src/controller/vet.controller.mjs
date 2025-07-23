import vet from "../schemas/vet.schema.mjs"

const getVets = async ( req, res ) => {
    try {
        const vets = await vet.find()
        res.status(200).json(vets) 
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener los veterinarios' })
    }
}

const getVetById = async ( req, res ) => {
    try {
        const vets = await vet.findById(req.params.id)
        if ( !vets ) {
            return res.status(404).json({ message: 'Veterinario no encontrado' })
        }
        res.status(200).json( vets )    
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener el veterinario' })
    }
}

const createVet = async ( req, res ) => {
    try {
       const { name, email, phone } = req.body
       
       if ( !name || !phone || !email ) {
            res.status( 400 ).json ( { message: 'Todos los campos son obligatorios' } )
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if ( !emailRegex.test( email ) ) {
            return res.status( 400 ).json( { message: 'Por favor ingrese un correo electrónico válido' } )
        }
        
        const newVet = new vet( { name, email, phone } )
        const savedVet = await newVet.save()
        res.status( 201 ).json( savedVet )
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear el veterinario' })
    }
}

const updateVet = async ( req, res ) => {
    try {
        const { name, email, phone } = req.body
        
        if ( !name || !email || !phone ) {
            return res.status( 400 ).json ( { message: 'Todos los campos son obligatorios' } )
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if ( !emailRegex.test( email ) ) {
            return res.status( 400 ).json( { message: 'Por favor ingrese un correo electrónico válido' } )
        }

        const updatedVet = await vet.findByIdAndUpdate( 
            req.params.id,
            { name, email, phone },
            { new: true, runValidators: true }
        )

        if ( !updatedVet ) {
            return res.status(404).json({ message: 'Veterinario no encontrado' })
        }
        
        res.status(200).json( updatedVet )    
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al actualizar el veterinario' })
    }
}

const deleteVet = async ( req, res ) => {
    try {
        const deletedVet = await vet.findByIdAndDelete(req.params.id)
        if ( !deletedVet ) {
            return res.status(404).json({ message: 'Veterinario no encontrado' })
        }
        res.status(200).json({ message: 'Veterinario eliminado correctamente' })    
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al eliminar el veterinario' })
    }
}

export {
    getVets,
    getVetById,
    createVet,
    updateVet,
    deleteVet
}