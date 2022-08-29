
import Patient from "../models/Patient.js";


const addPatient = async (req, res) => {
    const patient = new Patient(req.body);
    patient.veterinarian = req.veterinarian._id;
    try {
        const savedPatient = await patient.save();
        res.json(savedPatient);
    } catch (error) {
        console.log(error);
    }
};

const showPatients = async (req, res) => {
    const patients = await Patient.find()
        .where('veterinarian')
        .equals(req.veterinarian);

    res.json(patients);
};

const getPatient = async (req, res) => {
    const {id} = req.params;
    const patient = await Patient.findById(id);

    if(!patient) {
        res.status(404).json({msg: "Not found"});
    }

    if (patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
        return res.json({ msg: "Not valid action"});
    }
    //get
    if (patient) {
        res.json({patient});
    } 
};

const updatePatient = async (req, res) => {
    const {id} = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
        res.status(404).json({msg: "Not found"});
    } 

    if (patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
        return res.json({ msg: "Not valid action"});
    }

    //update
    patient.name = req.body.name || patient.name;
    patient.propietary = req.body.propietary || patient.propietary;
    patient.email = req.body.email || patient.email;
    patient.date = req.body.date || patient.date;
    patient.syntoms = req.body.syntoms || patient.syntoms;

    try {
        const updatedPatient = await patient.save();
        res.json(updatedPatient);
    } catch (error) {
        console.log(error);
    }
};

const deletePatient = async (req, res) => {
    const {id} = req.params;
    const patient = await Patient.findById(id);

    if (!patient) {
        res.status(404).json({msg: "Not found"});
    } 

    if (patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
        return res.json({ msg: "Not valid action"});
    }

    try {
        await patient.deleteOne();
        res.json({msg: "Patient deleted"});
    } catch (error) {
        console.log(error);
    }
};

export {
    addPatient,
    showPatients,
    getPatient,
    updatePatient,
    deletePatient
};