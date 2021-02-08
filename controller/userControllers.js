const { users } = require("../models"); // import user models
const passport = require('passport'); // import passport
const jwt = require('jsonwebtoken'); // import jsonwebtoken
const news = require("../models/news");
// const jwt_decode = require("jwt-decode");
// const bcrypt = require("bcrypt");

class userController {
  async getAll(req, res, next) {
    try {
      const data = await users.findAll();
      console.log(data);
      if (data) {
        return res.status(200).json({
          status: "succes",
          message: "Success get all data",
          data: data,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(422).json({
        status: "failed",
      });
    }
  }

  async login(user,req, res) {
    // get the req.user from passport authentication
    const body = {
      id: user.id,
      email: user.email,
      // role : user.dataValues.role
    };
    // create jwt token from body variable
    const token = jwt.sign(
      {
        user: body,
      },
      "secret_password"
    );

    // success to create tokenc
    // console.log(user,res.status, "data")
    res.status(200).json({
      status: "success",
      message: "Login Success!",
      token: token,
    });
  }

  async signup(req, res, next) {
    // get the req.user from passport authentication
    const checkId = await users.findOne({
      where: {
        email : req.body.email
      }
    }).catch(err => {
      res.status(422).json({
        status: "failed",
        message: "Email invalid!",
      });
    });
    if(checkId) {
      res.status(422).json({
        status: "failed",
        message: "Email is exist!",
      });
    }
    let userData = await users.create({
      email : req.body.email,
      password : req.body.password,
      fullname : req.body.fullname
    })
    const token = jwt.sign(
      {
        user: userData,
      },
      "secret_password"
    );
    res.status(200).json({
      status: "success",
      message: "Signup Success!",
      token: token,
    });
  }
}

module.exports = new userController()