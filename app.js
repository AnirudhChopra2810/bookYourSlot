const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const nodemailer = require('nodemailer');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const fs = require('fs');
let date;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
const config = process.env;
console.log(config)

const port = process.env.PORT;

const ID = uuidV4();
let writerStream = fs.createWriteStream('output.txt');
writerStream.write(ID, 'utf-8');

//Please provide your own gmail credentials ie. gamil and password
//And make sure it has 2 factor verification and any other protection turned off
app.post('/', async (req, res) => {
	console.log(req);
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		requireTLS: true,
		port: 587,
		auth: {
			user: config.USER,
			pass: config.PASSWORD
		}
	});

	await transporter.sendMail({
		from: 'anirudhchpr100@gmail.com',
		to: req.body.email,
		subject: 'Slot Confirmation',
		text: `Your slot is booked for the date ${req.body.date}, You can track the status of the meeting using following link: http://localhost:3000/status.html  `
	});

	await transporter.sendMail({
		from: 'anirudhchpr100@gmail.com',
		to: 'anirudhchopra40@gmail.com',
		subject: 'Slot Confirmation',
		text: `The slot is booked of the client dated ${req.body.date}, You can track the status of the meeting using following link:http://localhost:3000/status.html  `
	});
	console.log(req.body);
	date = req.body.date;
	return res.send({ message: 'ok' });
});

app.get('/status', (req, res) => {
	console.log('i worked');
	let id = fs.readFileSync('output.txt', 'utf-8');
	return res.send({ Id: id, Date: date });
});

io.on('connection', (socket) => {
	socket.on('join-room', (roomId, userId) => {
		socket.join(roomId);
		socket.to(roomId).emit('user-connected', userId);
		console.log(roomId);
		socket.on('disconnect', () => {
			socket.to(roomId).emit('user-disconnected', userId);
		});
	});
});

app.get('/appointment', (req, res) => {
	let id = fs.readFileSync('output.txt', 'utf-8');
	res.redirect(`/appointment/${id}`);
});

app.get('/appointment/:room', async (req, res) => {
	res.render('appointment', { roomId: req.params.room });
});

server.listen(3000, () => {
	console.log(`server running on the port: ${port}`);
});
