import mongoose from 'mongoose';

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    propietary: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    syntoms: {
        type: String,
        required: true
    },
    veterinarian: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinarian'
    },
    
}, {
    timestamps: true,
});

const Patient = mongoose.model("Patient", patientSchema);


export default Patient;