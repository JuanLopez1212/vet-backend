import express from "express";
import cors from "cors";
import dbConnection from "./config/mongo.config.mjs";
import pet from "./routes/pet.routes.mjs";
import owner from "./routes/owner.routes.mjs";
import vet from "./routes/vet.routes.mjs";
import date from "./routes/date.routes.mjs";
import test from "./routes/test.route.mjs"


const app = express()

app.use(cors())
dbConnection()
app.use ( test )
app.use (express.json())
app.use ( pet )
app.use ( owner )
app.use ( vet )
app.use ( date )

app.listen ( 3000, () => {
    console.log ( 'Servidor corriendo en el puerto 3000' )
})

