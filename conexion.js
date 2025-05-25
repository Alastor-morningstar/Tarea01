const  Sequelize  = require('sequelize')//importar sequelize

//traer el objeto de la conexion con la bd con sequleize

const sequelize = new Sequelize({
    dialect: 'sqlite', //tipo de base de datos a utilizar
    storage: './articulos.sqlite' //nombre del archivo de bade de datos
})

module.exports = sequelize;