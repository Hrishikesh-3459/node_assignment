const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/", (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				return res.status(401).json({
					message: "Auth failed",
				});
			} else {
				bcrypt.compare(req.body.password, user[0].password, (err, result) => {
					if (err) {
						return res.status(401).json({
							message: "Auth failed",
						});
					}
					if (result) {
						const token = jwt.sign(
							{
								email: user[0].email,
								userId: user[0]._id,
							},
							"secret",
							{
								expiresIn: "1h",
							}
						);
						return res.status(200).json({
							message: "Auth successful",
							token: token,
						});
					}
					return res.status(401).json({
						message: "Auth failed",
					});
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
