import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

const port = 3001;
app.listen(port, async () => {
  console.log("listening at port", port);
});

app.get("/api/yo", async (req, res) => {
  res.send({
    Message: "yo",
  });
});
