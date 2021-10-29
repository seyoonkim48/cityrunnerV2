const { default: axios } = require("axios");

const models = require("../models");
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  saveRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
  destroyToken,
} = require("../functions/tokenFunction");

module.exports = {
  login: async (req, res) => {
    //POST

    try {
      let email = req.body.email;
      let password = req.body.password;
      // 패스워드 안주기

      const data = await models.user.findOne({
        where: {
          email: email,
          password: password,
        },
        attributes: { exclude: ["password"] },
      });

      if (!data) {
        return res
          .status(409)
          .json({ message: "유효하지 않은 비밀번호, email" });
      } else {
        let refreshToken = await verifyRefreshToken(data.id);
        if (!refreshToken) {
          refreshToken = await generateRefreshToken(data.id);
          await saveRefreshToken(data.id, refreshToken);
        }

        let accessToken = await generateAccessToken(data.id);
        await sendAccessToken(res, accessToken);
        console.log(data);
        return res.status(200).json({ data: data });
      }
    } catch (err) {
      if (err) {
        res.status(500).send("서버 에러");
      }
    }
  },

  logout: async (req, res) => {
    return res
      .status(200)
      .clearCookie("accessToken")
      .json({ message: "로그아웃 성공" });
  },

  signup: async (req, res) => {
    //Post

    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    if (!email && !password && !username)
      return res.status(400).json({ message: "이메일,닉네임 기입" });

    let checkEmail = await models.user.findOne({ where: { email: email } });
    let checkUsername = await models.user.findOne({
      where: { username: username },
    });

    if (checkEmail || checkUsername)
      return res.status(409).json({ message: "이미 존재하는 이메일,닉네임" });

    await models.user.create({
      email: email,
      password: password,
      username: username,
    });

    return res.status(200).json({ message: "회원 가입 성공" });
  },

  check: async (req, res) => {
    //Post
    try {
      // let username = req.body.username;

      // let data = await models.user.findOne({
      //   where: {
      //     username: username,
      //   },
      // });

      return data
        ? res.status(409).json({ message: "중복된 닉네임" })
        : res.status(200).json({ message: "사용가능한 닉네임" });
    } catch (err) {
      if (err) {
        res.status(500).send({
          message: "server error",
        });
      }
    }
  },

  signout: async (req, res) => {
    //Delete
    // 쿠키에 token을 받아서 유저 정보 받아야 함

    try {
      let data = await verifyAccessToken(req);

      await destroyToken(res, data.id);
      await models.user.destroy({
        where: {
          id: data.id,
        },
      });

      return res.status(204).json({ message: "유저 삭제 성공" });
    } catch (error) {
      return res.send({
        message: "server error",
      });
    }
  },

  oauth: async (req, res) => {
    // POST /user/oauth
    // Google, Kakao에 정보 요청하기
    try {
      const { authorizationCode, category } = req.body;
      const data = {};
      if (category === "google") {
        // Google
        await axios
          .get(
            "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" +
              authorizationCode,
            {
              headers: {
                authorization: `token ${authorizationCode}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            const { email, name, picture } = res.data;
            data.email = email;
            data.username = name;
            data.image = picture;
          })
          .catch((err) => {
            res.status(400).send("잘못된 요청입니다.");
          });
      } else if (category === "kakao") {
        //Kakao
        await axios
          .get("https://kapi.kakao.com/v2/user/me", {
            headers: {
              authorization: `Bearer ${authorizationCode}`,
            },
          })
          .then((res) => {
            data.email = res.data.kakao_account.email || res.data.id;
            data.username = res.data.properties.nickname;
            data.image = res.data.kakao_account.profile.profile_image_url;
          })
          .catch((err) => {
            res.status(400).send("잘못된 요청.");
          });
      }

      const [result, created] = await models.user.findOrCreate({
        where: {
          email: data.email,
          password: category === "google" ? "google" : "kakao",
        },
        defaults: {
          username: data.username,
          image: data.image,
        },
      });

      res.status(200).json({
        data: {
          email: result.email,
          password: result.password,
        },
      });
    } catch (err) {
      res.status(500).send({
        message: "server error",
      });
    }
  },
};
