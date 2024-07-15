import express from "express";
import { getLatestData } from "../service/stock";


const router = express.Router();

router.get('/:symbol',getLatestData)

export default router;