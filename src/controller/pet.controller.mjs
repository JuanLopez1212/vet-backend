import pet from '../schemas/pet.schema.mjs';

const getAllPets = async ( req, res ) => {
    try {
        const pets = await pet.find().populate( 'owner', 'name email phone' )
        res.status(200).json(pets)    
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener las mascotas' });
    }
}

const getPetById = async ( req, res ) => {
    try {
        const petsId = await pet.findById( req.params.id ).populate( 'owner'  );
        if (!petsId) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }
        res.status(200).json(petsId)
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al obtener la mascota' });
    }
}

const createPet = async ( req, res ) => {
    try {
        const { name, type, race, age, owner } = req.body   
        
        if ( !name || !type || !race || !age || !owner ) {
            return res.status( 400 ).json ( { message: 'Todos los campos son obligatorios' } );
        }
        if ( age < 0 ) {
            return res.status ( 400 ).json ( { message: 'La edad no puede ser negativa' } );
        }

        const newPet = new pet( { name, type, race, age, owner } )
        const savedPet = await newPet.save()
        res.status( 201 ).json( savedPet )
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al crear la mascota' });
    }
}

const updatePet = async ( req, res ) => {
    try {
        const { name, type, race, age, owner } = req.body;
        
        if ( !name || !type || !race || !age || !owner ) {
            return res.status( 400 ).json ( { message: 'Todos los campos son obligatorios' } );
        }

        const updatedPet = await pet.findByIdAndUpdate( 
            req.params.id,
            { name, type, race, age, owner },
            { new: true, runValidators: true }
        )
        
        if ( !updatedPet ) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        res.status(200).json(updatedPet)
    } 
    catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error al actualizar la mascota' });
    }
}

const deletePet = async ( req, res ) => {
    try {
        const petId = req.params.id
        const deletedPet = await pet.findByIdAndDelete( petId )
        
        if ( !deletedPet ) {
            res.status( 404 ).json( { message: 'Mascota no encontrada' } )
        }

        res.status( 200 ).json({ message: 'Mascota eliminada correctamente' } )
    } 
    catch (error) {
        console.error( error )
        res.status( 500 ).json({ message: 'Error al eliminar la mascota' } )
    }
}

export {
    getAllPets,
    getPetById,
    createPet,
    updatePet,
    deletePet
}