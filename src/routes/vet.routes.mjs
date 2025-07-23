import { Router } from "express";
import { createVet, deleteVet, getVetById, getVets, updateVet } from "../controller/vet.controller.mjs";

const router = Router();

router.get ( '/api/vets', getVets )
router.get ( '/api/vets/:id', getVetById )
router.post ( '/api/vets', createVet )
router.patch ( '/api/vets/:id', updateVet )
router.delete ( '/api/vets/:id', deleteVet )

export default router