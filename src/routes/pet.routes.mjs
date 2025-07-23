import express from "express" 
import { createPet, getAllPets, getPetById, updatePet } from "../controller/pet.controller.mjs"
const router = express.Router()

router.get ( '/api/pets', getAllPets )
router.get ( '/api/pets/:id', getPetById )
router.post ( '/api/pets', createPet )
router.patch ( '/api/pets/:id', updatePet )

export default router 