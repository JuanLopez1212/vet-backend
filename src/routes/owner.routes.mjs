import { Router } from "express";
import { createOwner, deleteOwner, getAllOwners } from "../controller/owner.controller.mjs";

const router = Router();

router.post ( '/api/owner', createOwner )
router.get ( '/api/owner', getAllOwners )
router.delete ( '/api/owner/:id', deleteOwner )

export default router;