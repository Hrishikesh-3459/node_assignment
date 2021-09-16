const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

// localhost:27017

const login = require("./api/routes/login");
const register = require("./api/routes/register");

mongoose.connect(`mongodb://localhost:27017/node_assignment`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "*");
		return res.status(200).json({});
	}
	next();
});

app.use("/login", login);
app.use("/register", register);

app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
