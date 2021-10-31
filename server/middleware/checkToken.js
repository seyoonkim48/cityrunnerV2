module.exports = {
  checkToken: async (req, res, next) => {
    const isToken = await autoManageAccessToken(req, res);
    if (!isToken) return res.status(401).json({ message: "토큰이 없습니다" });
    next();
  },
};
