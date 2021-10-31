const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const WebSocket = require("ws");
const http = require("http");

const app = express();

const userRouter = require("./router/userRouter");
const chatRouter = require("./router/chatRouter");
const mypageRouter = require("./router/mypageRouter");
const mycrewRouter = require("./router/mycrewRouter");
const postsRouter = require("./router/postsRouter");
const imageRouter = require("./router/imageRouter");

const socketChat = require("./controller/functions/chatFuntion");
const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (_, res) => res.send("Hello! This is Cityrunner Ver.2"));

app.use("/user", userRouter);
app.use("/mypage", mypageRouter);
app.use("/chat", chatRouter);
app.use("/mycrew", mycrewRouter);
app.use("/posts", postsRouter);
app.use("/images", imageRouter);

const ws = new WebSocket.Server({
  server,
});

const port = 4000;

server.listen(port, () =>
  console.log(`listening on => http://localhost:${port}`)
);
