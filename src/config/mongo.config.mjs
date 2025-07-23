import mongoose from "mongoose";

const dbConnection = async () => {

    try {
         await mongoose.connect ('mongodb://localhost:27017/db-vet-place', {})

         console.log ( 'Base de datos conectada correctamente' )
    } 
    catch (error) {
        console.error ( error )
        console.log ( 'Error al conectar a la base de datos' )
    }
   
}

export default dbConnection;