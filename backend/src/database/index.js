import 'dotenv';
import knex from 'knex';
import configuration from '../../knexfile';

const connection = knex(configuration[process.env.NODE_ENV]);

export default connection;
