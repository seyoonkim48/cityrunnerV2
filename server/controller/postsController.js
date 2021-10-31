const { user, post, chattingRoom, Sequelize } = require("../models");
const { getParsedDate } = require("./Functions/dataFormat");
const Op = Sequelize.Op;
const {
  verifyAccessToken,
  decodeToken,
  verifyRefreshToken,
  generateAccessToken,
  sendAccessToken,
  autoManageAccessToken,
} = require("./Functions/tokenFunction");

module.exports = {
  posts: async (req, res) => {
    // router.post('/', posts);
    // 글쓰기
    try {
      // const decode = verifyAccessToken(req);
      // if (!decode) {
      //   const forced = decodeToken(req.cookies.accessToken);
      //   if (!forced) {
      //     return res.status(400).json({ message: "잘못된 요청 입니다" });
      //   }
      //   const refreshData = await verifyRefreshToken(forced.payload.id);
      //   if (!refreshData) {
      //     return res.status(401).json({ message: "권한이 없는 유저입니다" });
      //   } else {
      //     const accessToken = generateAccessToken(refreshData.id);
      //     sendAccessToken(res, accessToken);
      //   }
      // }
      const decode = await autoManageAccessToken(req, res);
      // if (!decode) {
      //   return res.status(401).json({ message: "권한이 없는 유저입니다" });
      // }

      const { level, time, location, max, distance, title, comment } = req.body;
      const postData = {
        level,
        time,
        location,
        max,
        distance,
        title,
        comment,
        postManager: decode.id,
      };
      const postTest = await post.create(postData);
      console.log(postTest);
      //! 테스트 끝나면 하루에 하나만 쓸 수 있도록 로직 추가
      await chattingRoom.create({
        memberId: decode.id,
        postId: postTest.id,
      });
      res.status(200).json({ message: "글이 생성" });
    } catch (err) {
      res.status(500).send({ message: "server error" });
    }
  },
  filterPage: async (req, res) => {
    // router.get('/', filterPage);
    // 글 목록 가져오기
    try {
      const { page } = req.query;

      if (!page) {
        return res.status(400).json("잘못된 요청");
      }
      let offset = page > 1 ? 12 * (page - 1) : 0;
      const filter = {};
      for (let key in req.query) {
        if (!!req.query[key]) {
          filter[key] = req.query[key];
        }
      }
      delete filter.page;
      console.log(filter);
      const postList = await post.findAll({
        where: filter, //! 조건과 일치하는 경우만 출력. 범위를 지정하려면 [Op.gte] 작성필요
        order: [["id", "DESC"]],
        offset: offset,
        limit: 12,
      });
      const user = verifyAccessToken(req);
      let roomid = "";
      if (user) {
        roomid = await chattingRoom.findOne({
          where: { memberId: user.id },
          order: [["id", "DESC"]],
        });
        if (roomid) {
          roomid = roomid.dataValues.postId;
        }
      }
      postList.createdAt = getParsedDate(postList.createdAt);
      res.status(200).json({
        data: postList,
        roomid: roomid,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getPost: async (req, res) => {
    // router.get('/:postId', getPost);
    // 글 하나 가져오기
    try {
      const postId = req.params.postId;
      if (!postId) {
        return res.status(400).json("잘못된 요청입니다");
      }
      const postData = await post.findOne({
        where: {
          id: postId,
        },
      });
      if (!postData) {
        return res.status(404).json("유효하지 않글");
      }
      postData.dataValues.createdAt = getParsedDate(
        postData.dataValues.createdAt
      );
      res.status(200).json({
        data: postData.dataValues,
      });
    } catch (err) {
      res.status(500).send({
        message: "server error",
      });
    }
  },
  updatePost: async (req, res) => {
    // router.put('/:postId', updatePost);
    // 글 내용 수정하기
    try {
      const postId = req.params.postId;
      if (!postId) {
        return res.status(400).json({ message: "잘못된 요청" });
      }
      const decode = await autoManageAccessToken(req, res);
      // if (!decode) {
      //   return res.status(401).json({ message: "권한이 없는 유저입니다" });
      // }
      // body에 있는 값들로 update
      const { level, time, location, max, distance, title, comment } = req.body;
      const postData = { level, time, location, max, distance, title, comment };
      const updatePostData = await post.update(postData, {
        where: {
          id: postId,
        },
      });
      res.status(200).json({ data: updatePostData });
    } catch (err) {
      res.status(500).send({
        message: "server error",
      });
    }
  },
  deletePost: async (req, res) => {
    // router.delete('/:postId', deletePost);
    // 글 삭제하기
    try {
      const postId = req.params.postId;
      if (!postId) {
        return res.status(400).json({ message: "잘못된 요청" });
      }
      const decode = await autoManageAccessToken(req, res);
      // if (!decode) {
      //   return res.status(401).json({ message: "권한이 없는 유저입니다" });
      // }
      await post.destroy({
        where: {
          id: postId,
        },
      });
      res.status(200).json({ message: "글 삭제 성공" });
    } catch (err) {
      res.status(500).send({
        message: "server error",
      });
    }
  },
  joinCrew: async (req, res) => {
    // router.put('/join/:postId', joinCrew);
    // 크루 참여하기
    try {
      const postId = req.params.postId;
      console.log(postId);
      if (!postId) {
        return res.status(400).json({ message: "잘못된 요청" });
      }
      const decode = await autoManageAccessToken(req, res);
      // if (!decode) {
      //   return res.status(401).json({ message: "권한이 없는 유저입니다" });
      // }
      const checkPost = await post.findOne({
        where: {
          id: postId,
        },
      });
      if (!checkPost) {
        return res.status(404).json({ message: "존재하지 않는 글" });
      }
      const [result, created] = await chattingRoom.findOrCreate({
        where: {
          memberId: decode.id,
          postId: postId,
        },
      });
      if (!created) {
        return res.status(409).json({ message: "이미 참여한 크루" });
      } else {
        const postData = await post.findOne({
          where: {
            id: result.postId,
          },
        });
        if (postData.join + 1 > postData.max) {
          return res.status(204).json({ message: "참여된 크루 존재" });
        }
        await post.update(
          { join: postData.join + 1 },
          {
            where: {
              id: postData.id,
            },
          }
        );
        return res.status(200).json({ message: "크루 참가 성공" });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
  exitCrew: async (req, res) => {
    // router.delete('/exit/:postId', exitCrew);
    // 크루 나가기
    try {
      const postId = req.params.postId;
      if (!postId) {
        return res.status(400).json({ message: "잘못된 요청" });
      }
      const decode = await autoManageAccessToken(req, res);
      // if (!decode) {
      //   return res.status(401).json({ message: "권한이 없는 유저입니다" });
      // }
      await chattingRoom.destroy({
        where: {
          memberId: decode.id,
          postId: postId,
        },
      });
      res.status(200).json({ message: "크루 탈퇴" });
    } catch (err) {
      res.status(500).send({
        message: "server error",
      });
    }
  },
};
