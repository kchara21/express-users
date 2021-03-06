import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "Dogblack2021",
    "database": "db_citas_odontologicas",
    "synchronize": true,
    "logging": false,
    "entities": [
       "src/entity/**/*.ts"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ],
 });

 AppDataSource.initialize()
    .then((res) => {
       console.log('db connected');
    })
    .catch((error) => console.log(error))
