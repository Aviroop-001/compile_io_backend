const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const SharedCode = require('../models/SharedCode') // Import the sharedCodeModel.js module

router.post("/", async (req, res) => {
  const { code } = req.body;
  const uniqueId = uuidv4();

  try {
    const sharedCode = await SharedCode.create({ _id: uniqueId, code });
    res.json({ uniqueId });
  } catch (error) {
    console.error("Error sharing code:", error);
    res.status(500).json({ error: "Error sharing code" });
  }
});

router.get("/:uniqueId", async (req, res) => {
  const { uniqueId } = req.params;

  try {
    const sharedCode = await SharedCode.findOne({ _id: uniqueId });
    if (sharedCode) {
      res.json({ code: sharedCode.code });
    } else {
      res.status(404).json({ error: "Shared code not found" });
    }
  } catch (error) {
    console.error("Error getting shared code:", error);
    res.status(500).json({ error: "Error getting shared code" });
  }
});

module.exports = router;
