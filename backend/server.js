var express = require('express');
var cors = require('cors');
var body_parser = require('body-parser')

var app = express();

/* Opciones del cors para solo acceder desde la URL que trabaja el frontend */
var corsOpt = {
    origin: 'http://localhost:4200',
    /* Si la operacion se hace correctamente nos devuelve un 200 */
    optionSucessStatus: 200
}

var tareas= [{trabajo: 'primera tarea', usuario:'David'},
            {trabajo: 'segunda tarea', usuario: 'Daniel'}];

var users = [];

app.use(body_parser.json());

var api = express.Router();
var auth = express.Router();


api.use(cors());


api.get('/tareas', cors(corsOpt), (request, response) => {
    /* Cuando el usuario hace una petición a tareas le devolvemos una respuesta con un json de la variable tareas */
    response.json(tareas);
})

api.get('/tareas/:username', cors(corsOpt), (request, response) => {
    var username = request.params['username']
    var resultado = tareas.filter(tarea => tarea.usuario == username)
    /* Cuando el usuario hace una petición a tareas le devolvemos una respuesta con un json de la variable tareas */
    response.json(resultado);
})


api.post('/tarea', cors(corsOpt), (request, response) => {
    /* Cuando el usuario hace una petición a tarea se realiza un push para incluirla en el listado */
    tareas.push(request.body);
    response.json(request.body);
})

auth.use(cors());
auth.post('/register', cors(corsOpt), (request, response) => {
    users.push(request.body);
})


app.use('/api', api);
app.use('/auth', auth);

app.listen(7070);
