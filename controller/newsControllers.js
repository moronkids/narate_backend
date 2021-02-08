const { news } = require("../models"); // import user models
const passport = require("passport"); // import passport
const jwt = require("jsonwebtoken"); // import jsonwebtoken
const imagekit = require("../lib/imageKit");
// const jwt_decode = require("jwt-decode");
// const bcrypt = require("bcrypt");

class userController {
  async getAllNews(req, res, next) {
    try {
      //   const data = await news.findAll();
      const limit = Number(req.query.limit);
      const page = Number(req.query.page);
      const offset = page !== 1 ? page * limit : 0;
      const data = await news.findAndCountAll({
        where: {
          is_active: "Y",
        },
        order: [["updated_at", "ASC"]],
        limit: limit,
        offset: offset,
      });
      // const reStructure = data.rows.map((val) => data.rows[val.id] = val);
      let arrResult = {};

      data.rows.map((val) => {
        return (arrResult[val.id] = val);
      });

      console.log("data", arrResult);
      if (data) {
        return res.status(200).json({
          status: "succes",
          message: "Success get all data of news",
          data: arrResult,
          pagination: {
            page: page,
            limit: limit,
            total: data.count,
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.status(422).json({
        status: "failed",
      });
    }
  }
  async getOneNews(req, res, next) {
    try {
      //   const data = await news.findAll();
      const id = Number(req.params.id);
      const data = await news.findOne({
        where: {
          id: id,
        },
      });

      if (data) {
        return res.status(200).json({
          status: "succes",
          message: "Success get one data of news",
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

  async postNews(req, res, next) {
    try {
      let image;
      if (req.files) {
        image = await imagekit.upload({
          file: req.files[0].buffer,
          fileName: "IMG_" + Date.now(),
        });
        // updatedObj.image = image.url;
      }

      let data = await news.create({
        title: req.body.title,
        desc: req.body.desc,
        image: image.url,
      });

      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      res.status(422).json({
        status: "failed",
        message: error,
      });
    }
  }
  async deleteNews(req, res, next) {
    try {
      news.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({
        status: "success",
        message: "Deleted the news is successfully",
      });
    } catch (error) {
      res.status(422).json({
        status: "failed",
        message: error,
      });
    }
  }

  async updateNews(req, res, next) {
    console.log(req);
    try {
      news
        .findOne({ where: { id: req.params.id } })
        .then(async function (data) {
          // Check if record exists in db
          if (data) {
            let image = null;
            if (req.files.length > 0) {
              image = await imagekit.upload({
                file: req.files[0].buffer,
                fileName: "IMG_" + Date.now(),
              });
              // updatedObj.image = image.url;
            }
            if (image !== null) {
              data
                .update({
                  title: req.body.title,
                  desc: req.body.desc,
                  image : image.url
                })
                .then((result) => {
                  res.status(200).json({
                    status: "success",
                    message: "Updated the news is successfully",
                    data: result,
                  });
                });
            }
            data
              .update({
                title: req.body.title,
                desc: req.body.desc,
                // image : image.url ? image.url :
              })
              .then((result) => {
                res.status(200).json({
                  status: "success",
                  message: "Updated the news is successfully",
                  data: result,
                });
              });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(422).json({
            status: "failed",
            message: error,
          });
        });
    } catch (error) {
      res.status(422).json({
        status: "failed",
        message: error,
      });
    }
  }
}

module.exports = new userController();
