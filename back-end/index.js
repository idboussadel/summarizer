const express = require("express");
const multer = require("multer");
const path = require("path");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");

const articleController = require("./controllers/articleController");
const pdfController = require("./controllers/pdfController");
const officeController = require("./controllers/officeController");
const {
  sendErrorDev,
  sendErrorProd,
  AppError,
} = require("./controllers/errorController");

const cors = require("cors");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes and ips

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e2);
    const fileExtension = getFileExtension(file.originalname);
    const newFileName =
      file.fieldname + "-" + uniqueSuffix + "." + fileExtension;
    cb(null, newFileName);
  },
});

function getFileExtension(filename) {
  return filename.split(".").pop();
}

const upload = multer({ storage: storage });

const port = process.env.PORT;

app.get("/api/v1/data", articleController.articleUrlSummarizer);
app.post("/api/v1/pdf", upload.single("pdfFile"), pdfController.pdfSummarizer);
app.post(
  "/api/v1/pptx",
  upload.single("pptxFile"),
  officeController.officeSummarizer
);
app.post(
  "/api/v1/word",
  upload.single("wordFile"),
  officeController.officeSummarizer
);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// express middleware to catch errors
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Internal Server Error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
});

app.listen(port, () => console.log(`The server is running at ${port}`));
