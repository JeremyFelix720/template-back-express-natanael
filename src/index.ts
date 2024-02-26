import express from "express"
import "dotenv/config"
import cors from 'cors'
import bodyParser from "body-parser";
import { Sequelize } from 'sequelize';  // Voir : https://sequelize.org/docs/v6/getting-started/

// Import des tables principales
import { ObjectModel } from './models/ObjectModel';
import { objectRouter } from "./router/objectRouter";


require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT ? parseInt(process.env.PORT as string) : 3000
/*
const database = process.env.DATABASE as string;
const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;
const server = process.env.SERVER as string;
*/

// Création de la BDD
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db/database.sqlite'
});

/*
const sequelize = new Sequelize(database, username, password, {
  host: server,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    },
    dialectModule: require('pg'),
});
*/

// Création des tables principales par Sequelize
export const Object = ObjectModel(sequelize);


// sequelize.sync( {force: true} )  // Réinitialise les données de la BDD à chaque fois que l'on execute le programme avec la commande "npm run dev" ou "npm run start".

sequelize.sync()  // Conserve les données de la BDD à chaque fois que l'on execute le programme avec la commande "npm run dev" ou "npm run start".


async function connexionTest() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connexionTest();

// ROUTING
app.use('/api/object/', objectRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/toto', (req, res) => {
    res.send('Toto');
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  