import express from 'express'

const router = express.Router();

router.get('/', (req, res)=>{
    const msg = 'Bienvenido al API de Vet Place';
    console.log(msg);
    res.status(200).json({msg});
})

export default router