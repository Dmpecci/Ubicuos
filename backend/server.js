// server.js
require('dotenv').config();
require('dotenv').config();
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Importamos la función de conexión
const acousticRoutes = require('./routes/acousticRoutes');
const airRoutes = require('./routes/airRoutes');
const photovoltaicRoutes = require('./routes/photovoltaicRoutes');
const accidentRoutes = require('./routes/accidentRoutes'); // <--- Importar
const scooterRoutes = require('./routes/scooterAssignmentRoutes');
const bicycleFlowRoutes = require('./routes/bicycleFlowRoutes');
const bicycleAvailabilityRoutes = require('./routes/bicycleAvailabilityRoutes');
const streetRoutes = require('./routes/streetRoutes');
const regulatedParkingStreetRoutes = require('./routes/regulatedParkingStreetRoutes');
const sostenibilidadRoutes = require('./routes/sostenibilidadRoutes');
const censoRoutes = require('./routes/censoRoutes');
const containerLocationRoutes = require('./routes/containerLocationRoutes');
const acousticMeasurementStationRoutes = require('./routes/acousticMeasurementStationRoutes');
const fineRoutes = require('./routes/fineRoutes');
const occupancyRotationalParkingRoutes = require('./routes/occupancyRotationalParkingRoutes');
const pedestrianFlowRoutes = require('./routes/pedestrianFlowRoutes');
const trafficMeasurementPointRoutes = require('./routes/trafficMeasurementPointRoutes');
const lostObjectRoutes = require('./routes/lostObjectRoutes');
const taxiStopReservationRoutes = require('./routes/taxiStopReservationRoutes');
const trafficDataRoutes = require('./routes/trafficDataRoutes');
const locationRoutes = require('./routes/locationRoutes');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api/acoustics', acousticRoutes);
app.use(airRoutes);
app.use('/api/photovoltaic', photovoltaicRoutes);
app.use('/api/accidents', accidentRoutes);
app.use('/api/scooters', scooterRoutes);
app.use('/api/bicycle-flows', bicycleFlowRoutes);
app.use('/api/bicycle-availability', bicycleAvailabilityRoutes);
app.use('/api/streets', streetRoutes);
app.use('/api/regulated-parking-streets', regulatedParkingStreetRoutes);
app.use('/api/sostenibilidad', sostenibilidadRoutes);
app.use('/api/censo', censoRoutes);
app.use('/api/containers', containerLocationRoutes);
app.use('/api/acoustic-measurement-stations', acousticMeasurementStationRoutes);
app.use('/api/fines', fineRoutes);
app.use('/api/occupancy-rotational-parkings', occupancyRotationalParkingRoutes);
app.use('/api/pedestrian-flows', pedestrianFlowRoutes);
app.use('/api/traffic-measurement-points', trafficMeasurementPointRoutes);
app.use('/api/lost-objects', lostObjectRoutes);
app.use('/api/taxi-stop-reservations', taxiStopReservationRoutes);
app.use('/api/traffic-data', trafficDataRoutes);
app.use('/api/locations', locationRoutes);
// Arrancar el servidor   
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
