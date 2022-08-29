import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/db.js";
import veterinarianRoutes from "./routes/veterinarianRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

const permitedDomains = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) { 
        if (permitedDomains.indexOf(origin) !== -1) {

            callback(null, true);
        } else {
            callback(new Error('No permited by CORS'));
        }
     },
}

app.use(cors(corsOptions));

app.use('/api/veterinarians', veterinarianRoutes);
app.use('/api/patients', patientRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server on port 4000');
});