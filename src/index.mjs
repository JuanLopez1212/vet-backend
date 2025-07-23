import express from "express";
import dbConnection from "./config/mongo.config.mjs";
import pet from "./routes/pet.routes.mjs";
import owner from "./routes/owner.routes.mjs";


const app = express()

dbConnection()

app.use (express.json())

app.use ( pet )
app.use ( owner )

app.listen ( 3000, () => {
    console.log ( 'Servidor corriendo en el puerto 3000' )
})