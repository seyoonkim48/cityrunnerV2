require("dotenv").config();
const jwt = require("jsonwebtoken");
const { user } = require("../../models");

// ! aysnc 붙어있는 함수들은 호출 시 await을 붙여주세요!
module.exports = {
  generateAccessToken: (data) => {
    // accessToken을 생성합니다.
    // data : users 테이블의 id(index)
    return jwt.sign({ id: data }, process.env.ACCESS_SECRET, {
      expiresIn: "1d",
    }); // 30 -> 30초
  },

  generateRefreshToken: (data) => {
    // refreshToken을 생성합니다.
    // data : users 테이블의 id(index)
    return jwt.sign({ id: data }, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    }); // 숫자만 적으면 초 단위
  },

  sendAccessToken: (res, accessToken) => {
    // accessToken을 쿠키에 담아 보냅니다.
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000, // 쿠키 기간 설정은 길게 뒀습니다. 짧게두니 너무 짧게 적용되는듯해요 ㅠㅠ
    }); // 응답은 각 컨트롤러에서 보냅니다. 이 함수는 쿠키에만! 담아 보냅니다. res.send()xxxx
  },

  saveRefreshToken: async (data, refreshToken) => {
    // refreshToken을 DB에 저장합니다.
    // data : users 테이블의 id(index)
    await user.update(
      { refreshToken: refreshToken },
      {
        where: {
          id: data,
        },
      }
    );
  },

  verifyAccessToken: (req) => {
    // 토큰이 유효한지 확인합니다.
    // 쿠키에 토큰이 없거나, 유효하지 않은 경우 null 값 리턴
    // 토큰이 유효하면 verify 함수의 결과 return
    const accessToken = req.cookies.accessToken;
    if (!accessToken) return null;
    try {
      const info = jwt.verify(accessToken, process.env.ACCESS_SECRET);
      return info;
    } catch (err) {
      return null;
    }
  },

  verifyRefreshToken: async (data) => {
    // DB에 있는 refreshToken을 조회합니다.
    // data : users 테이블의 id(index)
    const tokenData = await user.findOne({
      where: {
        id: data,
      },
    });
    const refreshToken = tokenData.refreshToken;
    try {
      const info = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      return info;
    } catch (err) {
      return null;
    }
  },

  decodeToken: (token) => {
    // 만료된 토큰을 강제로 해독합니다.
    // 토큰만 인자로 받습니다. (secret key 필요 X)
    // 결과는 객체 형식으로 나오고 그 객체의 payload에 verify할때와 똑같은 결과가 담겨있습니다.
    try {
      return jwt.decode(token, { complete: true });
    } catch (err) {
      return null;
    }
  },

  destroyToken: async (res, data) => {
    // cookie와 DB의 Token들을 모두 삭제합니다.
    res.clearCookie("accessToken");
    await user.update(
      { refreshToken: null },
      {
        where: {
          id: data,
        },
      }
    );
  },

  autoManageAccessToken: async (req, res) => {
    // 생산과 삭제를 제외한 모든 과정을 진행합니다.
    // verify AccessToken
    //-> 유효한 토큰 -> verify의 결과를 리턴
    //-> 유효하지 않은 토큰 -> decode Token 실행으로 id값 취득 -> DB에서 Refresh Token 찾은 뒤 verify
    // refresh Token 유효 -> access Token 재생산 및 cookie로 전송 (업데이트) -> refresh의 verify 결과값 리턴
    // refresh Token 유효 X -> null 리턴
    //! 요약
    // 어찌저찌 유효한 상태 -> verify의 결과 리턴
    // err || 모든게 유효하지 않은 상태 -> null 리턴
    try {
      const accessToken = req.cookies.accessToken;
      const accessData = jwt.verify(
        accessToken,
        process.env.ACCESS_SECRET,
        (err, decode) => {
          if (err) return err.message;
          return decode;
        }
      );
      if (typeof accessData === "string") {
        const decode = jwt.decode(accessToken, { complete: true });
        const userInfo = await user.findOne({
          where: {
            id: decode.payload.id,
          },
        });
        const refreshData = jwt.verify(
          userInfo.refreshToken,
          process.env.REFRESH_SECRET
        );
        if (!refreshData) {
          return null;
        } else {
          const newAccessToken = jwt.sign(
            decode.payload.id,
            process.env.ACCESS_SECRET
          );
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000,
          });
          return refreshData;
        }
      } else {
        return accessData;
      }
    } catch (err) {
      return null;
    }
  },
};
