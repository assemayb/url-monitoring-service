// testing the webhook url
const express = express();

const router = express.Router();

router.post("/webhook-test", (req, res) => {
  try {
    const { url, name } = req.body;

    console.log("=====> this is the webhook endpoint");
    console.log({ url, name });

    return res.status(200).json({
      message: "ok cool.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
