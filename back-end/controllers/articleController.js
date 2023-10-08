const cheerio = require("cheerio");
const axios = require("axios");
const { openAiCallText, openAiCallBullets } = require("./openAiController");
const { AppError } = require("./errorController");

const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";

exports.articleUrlSummarizer = async (req, res) => {
  const { url, type } = req.query;

  try {
    if (!url) {
      throw new AppError("Missing 'url' parameter.", 400);
    }

    const response = await axios.get(url, {
      headers: {
        "User-Agent": userAgent,
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const selectedElementsWithSpacing = [];

    $("h1,h2,h3,h4,p").each((index, element) => {
      const text = $(element).text();

      selectedElementsWithSpacing.push(text + "\n");
    });

    const selectedTextWithSpacing = selectedElementsWithSpacing.join("");

    let openAiResponse;

    if (type === "text") {
      openAiResponse = await openAiCallText(selectedTextWithSpacing);
    } else if (type === "bullets") {
      openAiResponse = await openAiCallBullets(selectedTextWithSpacing);
    } else {
      throw new AppError("Invalid summary type.", 400);
    }

    res.status(200).send({ summary: openAiResponse });
  } catch (error) {
    throw new AppError("Internal Server Error.", 500);
  }
};
