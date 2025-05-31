// db.js
const mongoose = require('mongoose');

// Función para conectar con MongoDB
const connectDB = async () => {
  try {
    // mongoose.connect devuelve una Promesa, por eso usamos await
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'mongoUbicuos'  // 👈 esto fuerza el uso de tu base real
});

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err.message);
    // Forzamos la salida si no puede conectar
    process.exit(1);
  }
};

// Exportamos la función
module.exports = connectDB;
