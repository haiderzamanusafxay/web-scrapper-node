const axios = require("axios");
const cheerio = require("cheerio");

const scrap = async (req, res) => {
  const { message } = req.body;

  try {
    try {
      const searchResults = await searchGoogle(message);
      const reply =
        searchResults.length > 0
          ? searchResults[0].snippet
          : "No relevant information found";
      res.json({ reply });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while searching Google" });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while communicating with the OpenAI API",
    });
  }
};

const searchGoogle = async (query) => {
  const GOOGLE_SEARCH_URL = "https://www.google.com/search?q=";
  try {
    const response = await axios.get(
      `${GOOGLE_SEARCH_URL}${encodeURIComponent(query)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      }
    );
    let $ = cheerio.load(response.data);
    console.log(response.status);
    let titles = [];
    let links = [];
    let snippets = [];
    let displayedLinks = [];

    $(".g .yuRUbf h3").each((i, el) => {
      titles[i] = $(el).text();
    });
    $(".yuRUbf a").each((i, el) => {
      links[i] = $(el).attr("href");
    });
    $(".g .VwiC3b ").each((i, el) => {
      snippets[i] = $(el).text();
    });
    $(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
      displayedLinks[i] = $(el).text();
    });

    const organicResults = [];

    for (let i = 0; i < titles.length; i++) {
      organicResults[i] = {
        title: titles[i],
        links: links[i],
        snippet: snippets[i],
        displayedLink: displayedLinks[i],
      };
    }
    console.log(organicResults);
    return organicResults;
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = { scrap };
