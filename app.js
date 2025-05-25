const express = require('express')
const bodyParser = require('body-parser')
const articulos = require('./articulos')
const cors = require('cors')
const app = express()
const puerto = 4000

app.use(bodyParser.json())
app.use(cors())

articulos.sequelize.sync()
  .then(() => {
    console.log('Base de datos y tablas sincronizadas!');
    app.listen(puerto, () => {
      console.log(`Servicio iniciado en el puerto ${puerto}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

app.listen(puerto, () => {
    console.log(`Servicio iniciado en el puerto ${puerto}`)
})

//agregar--create
app.post('/articulos', async (req, res) => {
    const { descripcion, precio, existencia } = req.body;
    const data = await articulos.create({
        descripcion,
        precio,
        existencia
    });
    res.send(data);
})

//leer----read
app.get('/articulos', async (req, res) => {
    const data = await articulos.findAll();
    res.send(data)
})


//delete
app.delete('/articulos/:id', async (req , res) => {
    const { id } = req.params;
    const data = await articulos.destroy({
        where:{
            id
        }
    })
    res.send(data)
})


//actualizar--update
app.put('/articulos/:id', async (req, res) => {
    const { descripcion, precio, existencia } = req.body;
    const { id } = req.params;
    const data = await articulos.update({
        descripcion, precio, existencia 
    },{
        where:{
            id
        }
    })
    res.send(data);
})

/*const express = require('express')
const bodyParser = require('body-parser')
const articulos = require('./articulos') // Tu modelo Sequelize
const cors = require('cors')
const app = express()
const puerto = 4000

app.use(bodyParser.json())
app.use(cors())

// ¡Añade esto para sincronizar la base de datos!
articulos.sequelize.sync()
  .then(() => {
    console.log('Base de datos y tablas sincronizadas!');
    app.listen(puerto, () => {
      console.log(`Servicio iniciado en el puerto ${puerto}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

// ... (tus rutas siguen aquí)
//agregar--create
app.post('/articulos', async (req, res) => {
    const { descripcion, precio, existencia } = req.body;
    try { // Añade try-catch para un mejor manejo de errores en el backend
        const data = await articulos.create({
            descripcion,
            precio,
            existencia
        });
        res.status(201).send(data); // 201 Created
    } catch (error) {
        console.error('Error al crear artículo:', error);
        res.status(500).send({ message: 'Error interno del servidor al crear artículo', error: error.message });
    }
})

//leer----read
app.get('/articulos', async (req, res) => {
    try {
        const data = await articulos.findAll();
        res.send(data);
    } catch (error) {
        console.error('Error al obtener artículos:', error);
        res.status(500).send({ message: 'Error interno del servidor al obtener artículos', error: error.message });
    }
})

//delete
app.delete('/articulos/:id', async (req , res) => {
    const { id } = req.params;
    try {
        const data = await articulos.destroy({
            where:{
                id
            }
        });
        if (data === 0) { // Si data es 0, no se encontró el artículo
            return res.status(404).send({ message: 'Artículo no encontrado' });
        }
        res.status(204).send(); // 204 No Content para eliminación exitosa
    } catch (error) {
        console.error('Error al eliminar artículo:', error);
        res.status(500).send({ message: 'Error interno del servidor al eliminar artículo', error: error.message });
    }
})

//actualizar--update
app.put('/articulos/:id', async (req, res) => {
    const { descripcion, precio, existencia } = req.body;
    const { id } = req.params;
    try {
        const [affectedRows, updatedArticulos] = await articulos.update({
            descripcion, precio, existencia
        },{
            where:{
                id
            },
            returning: true // Solo si tu base de datos lo soporta (ej. PostgreSQL). Para SQLite, esto no devuelve el objeto actualizado.
        });

        if (affectedRows === 0) {
            return res.status(404).send({ message: 'Artículo no encontrado' });
        }
        // Para SQLite, 'update' devuelve el número de filas afectadas.
        // Si necesitas el objeto actualizado, tendrías que hacer una consulta FIND después del update.
        res.send({ message: 'Artículo actualizado exitosamente', affectedRows });

    } catch (error) {
        console.error('Error al actualizar artículo:', error);
        res.status(500).send({ message: 'Error interno del servidor al actualizar artículo', error: error.message });
    }
})*/