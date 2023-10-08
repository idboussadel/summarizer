const fs = require("fs");
const officeParser = require("officeparser");
const { openAiCallText, openAiCallBullets } = require("./openAiController");
const { AppError } = require("./errorController");

exports.officeSummarizer = async (req, res) => {
  const file = req.file;
  const { type } = req.body;

  try {
    const data = await officeParser.parseOfficeAsync(file.path);
    let openAiResponse;

    if (type === "text") {
      openAiResponse = await openAiCallText(data);
    } else if (type === "bullets") {
      openAiResponse = await openAiCallBullets(data);
    } else {
      throw new AppError("Invalid summary type.", 400);
    }

    res.status(200).send({ summary: openAiResponse });
  } catch (error) {
    throw new AppError("Error processing PDF.", 500);
  } finally {
    fs.unlinkSync(file.path);
  }
};
