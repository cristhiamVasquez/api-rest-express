// ======================
// -----PUERTO-----------
// ======================
process.env.PORT = process.env.PORT || 3000;


// ======================
// -----ENTORNO----------
// ======================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ======================
// -----BASE DE DATOS----
// ======================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {} {
    //    urlDB = process.env.MONGO_URI;
    urlDB = 'mongodb://cafe-user:cafe123@ds061375.mlab.com:61375/cafe-db';
}
process.env.URLDB = urlDB;

// ======================
// Expiracion TOKEN
// ======================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;



// ======================
// SEED autenticacion
// ======================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

/*let seed;

if (process.env.SEED === 'este-es-el-seed-desarrollo') {
    seed = 'este-es-el-seed-desarrollo';
} else {
    seed = process.env.SEED_PROD;
};

process.env.SEED = seed;
*/