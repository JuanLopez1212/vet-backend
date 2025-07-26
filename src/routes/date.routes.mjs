import { Router } from "express";
import { createDate, deleteDate, getAllDates, getDateById, getDatesByPetId, updateDate } from "../controller/date.controller.mjs";
const router = Router();

router.post ( '/api/date', createDate )
router.get ( '/api/date', getAllDates )
router.get ( '/api/date/:id', getDatesByPetId )
router.get ( '/api/date/:id', getDateById )
router.patch ( '/api/date/:id', updateDate )
router.delete ( '/api/date/:id', deleteDate )


export default router