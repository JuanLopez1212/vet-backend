import { Router } from "express";
import { createOwner, getAllOwners } from "../controller/owner.controller.mjs";

const router = Router();

router.post ( '/api/owner', createOwner )
router.get ( '/api/owner', getAllOwners )

export default router;