// createAndSendMessage, getMessage, deleteMessage, enterMessage, reportUser

const models = require("../models");
const { post } = require("../Router/mycrewRouter");

const {
  generateAccessToken,
  sendAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
} = require("./Functions/tokenFunction");

module.exports = {
  getMessage: async (req, res) => {
    // GET end point : /chat/:postId
    // const postId = req.params.postId;
    // const chatroomId = req.params.chatroomId;

    let accessToken = req.cookies.accessToken;
    let data = verifyAccessToken(req);

    if (data === null) return res.status(401).json({ message: "Null" });

    if (!data) {
      const userId = decodeToken(accessToken).payload.id;
      const refreshToken = verifyRefreshToken(userId);
      if (!refreshToken)
        return res.status(401).json({ message: "다시 로그인 해주세요" });
      accessToken = generateAccessToken(userId);
    }

    let postId = await models.chattingRoom.findOne({
      where: { memberId: data.id },
      order: [["id", "DESC"]],
      limit: 1,
      raw: true,
    });

    postId = postId.postId;

    // 이전에 있는 대화 내용 불러오기
    const chattingLogs = await models.chattingLog.findAll({
      include: [
        {
          model: models.user,
          required: true,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "id",
              "email",
              "password",
              "refreshToken",
            ],
          },
        },
      ],
      where: { postId: postId },
      order: [["id", "ASC"]],
    });
    // 대화방에 가는 유저가 맞는지 판단하기위해서
    return res.json({ data: chattingLogs, userid: data.id, postId: postId });
  },
};
