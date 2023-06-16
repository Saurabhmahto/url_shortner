const shortid = require("shortid");
const { URL } = require("../models/url");

async function handleGenerateShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(404).json({ err: "url is required" });
  }
  const check = await URL.findOne({redirectedURL:body.url});
  if(check){
    return res.json({id:check?.shortId})
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectedURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result?.visitHistory?.length,
    analytics: result?.visitHistory,
  });
}

module.exports = {
  handleGenerateShortUrl,
  handleGetAnalytics,
};
