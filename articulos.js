const sequelize = require('./conexion');
const { DataTypes } = require('sequelize');

const articulos = sequelize.define('articulos',{
    id:{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion:{type: DataTypes.STRING},
    precio:{type: DataTypes.DOUBLE},
    existencia:{type: DataTypes.INTEGER}
},{
    timestamps:false
})

module.exports = articulos;