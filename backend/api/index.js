const express = require('express');
const router = express.Router();

const registerApi = require("./register");
router.use(registerApi);

const loginApi = require("./login");
router.use(loginApi);

const usersApi = require("./users");
router.use(usersApi);

module.exports = router;