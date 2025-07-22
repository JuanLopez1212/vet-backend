import express from "express";
import dbConnection from "./config/mongo.config.mjs";


const app = express()

dbConnection()



app.listen ( 3000, () => {
    console.log ( 'Servidor corriendo en el puerto 3000' )
})