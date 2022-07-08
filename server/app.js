const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
app.use(cors());

const port = 3300;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

app.post("/image-upload", async (req, res) => {
  const upload = await multer({ storage: storage }).single("file");
  upload(req, res, (err) => {
    if (!req.file) {
      res.send({ message: "please select a file to upload" });
    } else if (err instanceof multer.MulterError) {
      res.send(err);
    } else if (err) {
      res.send(err);
    } else {
      console.log(req.file.filename);
      res.send({
        status: "success",
        message: "file uploaded",
        imagedat: req.file.filename,
        // imagedata: req.files, --->for multiple images  ###(!req.files)
      });
    }
  });
});
// app.get("/", (req, res) => {
//   res.send("server started at port:3300");
// });

app.listen(port, () => {
  console.log(`server started at port at http://localhost:${port}`);
});
