const models = require("../models");
const { uploadFile, getFileStream } = require("./Functions/s3");
const fs = require("fs");
const util = require("util");
// 비동기로 돌리려는 함수를 promise로 감싸주지 않고 사용할 수 있다 util.promisify
const unlinkFile = util.promisify(fs.unlink);

module.exports = {
  // 토큰 받아서 해당 유저의 인데스을 받아서 채팅룸에 있는지 체크한다.
  getImage: async (req, res) => {
    //get
    try {
      const key = req.params.key;
      const readStream = getFileStream(key);

      readStream.pipe(res);
    } catch (err) {
      console.log(err);
    }
  },

  uploadImage: async (req, res) => {
    //post
    try {
      const usernmae = req.body.description;
      const file = req.file;
      const result = await uploadFile(file);
      await unlinkFile(file.path);
      await models.user.update(
        {
          image: result.Key,
        },
        { where: { username: usernmae } }
      );
      res.send({ imagePath: `images/${result.Key}` });
    } catch (err) {
      console.log(err);
    }
  },
};
