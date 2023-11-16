var express = require('express');
var cors = require('cors');
var body_parser = require('body-parser');

/* Se encarga de configurar el token */
var jwt = require('jsonwebtoken');

var config = require('./configs/config')

var app = express();

/* Opciones del cors para solo acceder desde la URL que trabaja el frontend */
var corsOpt = {
    origin: 'http://localhost:4200',
    /* Si la operacion se hace correctamente nos devuelve un 200 */
    optionSucessStatus: 200
}

var tareas= [{trabajo: 'primera tarea', usuario:'David'},
            {trabajo: 'segunda tarea', usuario: 'Daniel'}];

var users = [{nombre: 'marcos', email: 'm@mg.com', password: '1', id: 0}];

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

api.get('/users/yop' , cors(corsOpt), checkauth, (request, response) => {
    response.json(users[request.user])
})

api.post('/users/yop' , cors(corsOpt), checkauth, (request, response) => {
    var user = user[response.user];
    user.nombre = request.body.nombre;
    user.email = request.body.email;
    response.json(user);
})

auth.use(cors());
auth.post('/login', cors(corsOpt), (request, response) => {
    /* Encuentra el usuario que coincide con el email de la petición*/
    var user = users.find(user => user.email == request.body.email);
    /* Si no encuentra el usuario envia un error */
    if (!user) 
        senderrorauth(response);
    /* Si encuentra al usuario y la password coincide, envia el toquen de inicio de sesion */
    if (user.password == request.body.password)
        sendtoken(user, response);
    else
        senderrorauth(response);

})

auth.post('/register', cors(corsOpt), (request, response) => {
    /* Para obtener el indice del usuario que se crea */
    var index = users.push(request.body) -1;
    var user = users[index];
    user.id = index;
    sendtoken(user, response);
})

function sendtoken(user, response){
    var token = jwt.sign(user.id, config.llave)
    /* Pasamos el nombre y el token */
    response.json({nombre: user.nombre, token});
}

function senderrorauth(response){
    return response.json({success : false, message: 'Email o password erroneo'});
}

/* Middleware */
function checkauth(req, res, next){
    if(!req.header('Authorization'))
        return res.status(401).send({message: 'No tienes autorización'});
    var token = req.headers.authorization.split(' ')[1];
    var decode = jwt.verify(token, config.llave);
    if(!decode)
        return res.status(401).send({message: 'El token no es valido'});
    /* Si pasa todas las validaciones, el id del usuario = decode */
    req.user = decode;
    next();
}

app.use('/api', api);
app.use('/auth', auth);

app.listen(7070);
