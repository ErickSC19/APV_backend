import Patient from '../models/Patient.js';

const addPatient = async (req, res) => {
  const patient = new Patient(req.body);
  patient.veterinarian = req.veterinarian._id;
  try {
    const savedPatient = await patient.save();
    console.log('---------------------------------', savedPatient);
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
  const { id } = req.params;
  const patient = await Patient.findById(id);

  if (!patient) {
    res.status(404).json({ msg: 'Not found' });
  }

  if (patient.veterinarian.toString() !== req.veterinarian?._id.toString()) {
    return res.json({ msg: 'Not valid action' });
  }
  //get
  if (patient) {
    patient.date = formatDate(patient.date);
    res.json({ patient });
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { _id, ...changes } = req.body;
  const patient = await Patient.findById(id);

  if (!patient) {
    res.status(404).json({ msg: 'Not found' });
  }

  if (patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
    return res.json({ msg: 'Not valid action' });
  }

  try {
    await Patient.updateOne({ id: id }, changes);
    const updatedPatient = await Patient.findById(id);
    console.log(updatedPatient);
    res.json(updatedPatient);
  } catch (error) {
    console.log(error);
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;
  let patient;
  try {
    patient = await Patient.findById(id);
  } catch (error) {
    if (!patient) {
      return res.status(404).json({ msg: 'Not found' });
    }
  }

  if (patient.veterinarian._id.toString() !== req.veterinarian._id.toString()) {
    return res.status(403).json({ msg: 'Not valid action' });
  }

  try {
    await patient.deleteOne();
    res.json({ msg: 'Patient deleted' });
  } catch (error) {
    console.log(error);
  }
};

export { addPatient, showPatients, getPatient, updatePatient, deletePatient };

const formatDate = (date) => {
  const newDate = new Date(date);
  const preFormat = newDate.toISOString().split('T', 1);
  return preFormat[0];
};
