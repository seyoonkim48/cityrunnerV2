const moment = require("moment");

module.exports = {
  getParsedDate: (createdAt) => {
    return moment(createdAt).format("YY-MM-DD hh:mm");
  },
};
