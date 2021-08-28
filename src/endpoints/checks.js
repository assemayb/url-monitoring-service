const express = require("express");
const checkAuth = require("../utils/checkAuth");

const router = express.Router();

router.post("/create", checkAuth , async (req, res) => {
  try {
    const { url, path, host } = req.body;
    res.status(200).json({ message: { url, path, host } });
  } catch (error) {
    console.log(error.message);
  }
});


// edit a current check operation
router.put("/edit/:checkId", checkAuth, (req, res) => {
  const id = req.params.checkId
  try {
    res.status(200).json({message: id})
  } catch (error) {
    console.log(error.message);
  }
})


// Pause a check operation
router.put("/pause/:checkId", checkAuth, (req, res) => {
  const id = req.params.checkId
  try {
    res.status(200).json({message: id})
  } catch (error) {
    console.log(error.message);
  }
})


router.delete("/:checkId", (req, res) => {
  const id = req.params.checkId
  try {
    res.status(200).json({message: id})
  } catch (error) {
    console.log(error.message);
  }
})

module.exports = router;
