var express = require('express');
var cors = require('cors');

var app = express();

/* Opciones del cors para solo acceder desde la URL que trabaja el frontend */
var corsOpt = {
    origin: 'http://localhost:4200',
    /* Si la operacion se hace correctamente nos devuelve un 200 */
    optionSucessStatus: 200
}

var tareas= [{trabajo: 'primera tarea', usuario:'David'},
            {trabajo: 'segunda tarea', usuario: 'Daniel'}];

app.use(cors())

app.get('/tareas', cors(corsOpt), (request, response) => {
    /* Cuando el usuario hace una petición a tareas le devolvemos una respuesta con un json de la variable tareas */
    response.json(tareas);
})

app.listen(1234);
