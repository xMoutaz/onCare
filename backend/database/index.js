const { Sequelize, EmptyResultError } = require("sequelize");

const sequelize = new Sequelize(
  "oncaredb",
  "root",
  "mysqlpass11233",
  {
    host: "mysql_server", //localhost
    dialect: "mysql",
  }
);


// sequelize.sync()
//     .then(() => console.log('db sycned successfully!'))
//     .catch(err => console.log('EEEERRRROOOOOOR',err));

 function seqAsync() {
 sequelize.sync()
    .then(() => console.log('Database sycned successfully!'))
    .catch(err => console.log('Error',err));
}
setTimeout(function() { seqAsync(); }, 150000);


// (async () => {
//     try {
//       await sequelize.authenticate();
//       console.log("Connected to DB successfully.");
//     } catch (error) {
//       console.error("Connection failed: ", error);
//       await new Promise(res => setTimeout(res, 10000));
//     }  
// })();

module.exports = sequelize;