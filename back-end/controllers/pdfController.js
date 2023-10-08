const fs = require("fs");
const pdf = require("pdf-parse");
const { openAiCallText, openAiCallBullets } = require("./openAiController");
const { AppError } = require("./errorController");

exports.pdfSummarizer = async (req, res) => {
  const file = req.file;
  const { type } = req.body;

  if (!fs.existsSync(file.path)) {
    throw new AppError("PDF file not found.", 400);
  }

  try {
    const data = fs.readFileSync(file.path);
    const pdfData = await pdf(data);
    const text = pdfData.text;

    let openAiResponse;
    if (type === "text") {
      openAiResponse = await openAiCallText(text);
    } else if (type === "bullets") {
      openAiResponse = await openAiCallBullets(text);
    } else {
      throw new AppError("Invalid summary type.", 400);
    }

    res.status(200).send({ summary: openAiResponse });
  } catch (error) {
    throw new AppError("Internal Server Error", 500);
  } finally {
    fs.unlinkSync(file.path);
  }
};
