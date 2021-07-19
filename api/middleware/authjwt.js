const jwt = require("jsonwebtoken");
require('dotenv').config();
const User=require('../models/usermodel')
const Role=require('../models/rolemodel')
const mongoose=require('mongoose')
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
}
const verifyToken = (req, res, next) => {
  if(req.headers["authorization"]==null)
 { return res.status(403).send({ message: "No token provided!" });}
  let token = req.headers["authorization"].split(' ')[1];
  //console.log(token)
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    console.log(decoded.id)
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};
const authJwt = {
  verifyToken,
  isAdmin
 
};
module.exports = authJwt;