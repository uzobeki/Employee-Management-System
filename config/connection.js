const mysql = require('mysql');
const { rootCertificates } = require('node:tls');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: " ",
    database: 'EmployeeSystem_DB'
});

module.exports = connection;