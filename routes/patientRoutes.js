import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { addPatient, showPatients, getPatient, updatePatient, deletePatient } from "../controllers/patientController.js";

const router = express.Router();

router.route('/')
    .post(checkAuth, addPatient)
    .get(checkAuth, showPatients);

router.route('/:id')
.get(checkAuth, getPatient)
.put(checkAuth, updatePatient)
.delete(checkAuth, deletePatient);

export default router;