const models = require("../../models");

let rooms = {};

let getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + "-" + s4();
};
let arr = [];

module.exports = {
  enterChat: (socket) => {
    const uuid = getUniqueID();
    const leave = (roomId, userId) => {
      if (!rooms[roomId][uuid]) return;
      if (Object.keys(rooms[roomId]).length === 1) delete rooms[roomId];
      else delete rooms[roomId][uuid];
    };
    socket.on("message", async (msg) => {
      const jsonParseMsg = JSON.parse(msg);
      console.log(jsonParseMsg);
      const { roomId, userId, chat, option } = jsonParseMsg;

      let userInfo = await models.user.findOne({
        where: { id: userId },
      });
      jsonParseMsg["option"] = option;
      jsonParseMsg["username"] = userInfo.dataValues.username;

      if (option === "Join") {
        if (!rooms[roomId]) rooms[roomId] = {};
        if (!rooms[roomId][uuid]) {
          rooms[roomId][uuid] = socket;

          Object.entries(rooms[roomId]).forEach(([, sock]) =>
            sock.send(JSON.stringify(jsonParseMsg))
          );
        }
      } else if (option === "leave") {
        Object.entries(rooms[roomId]).forEach(([, sock]) =>
          sock.send(JSON.stringify(jsonParseMsg))
        );
        leave(roomId);
      } else if (!option) {
        if (rooms[roomId][uuid]) {
          await models.chattingLog.create({
            comment: chat,
            memberId: userId,
            postId: roomId,
          });

          Object.entries(rooms[roomId]).forEach(([, sock]) =>
            sock.send(JSON.stringify(jsonParseMsg))
          );
        }
      }
    });

    socket.on("close", () => {
      Object.keys(rooms).forEach((room) => leave(room));
    });
  },
};
