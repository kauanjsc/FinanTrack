const express = require("express");
const router = express.Router();
const controller = require("../controllers/transactionController");
const authenticateJWT = require("../middleware/authenticateJWT");

router.use(authenticateJWT);

router.get("/", controller.getAllTransactions);
router.get("/:id", controller.getTransactionById);
router.post("/", controller.createTransaction);
router.put("/:id", controller.updateTransaction);
router.delete("/:id", controller.deleteTransaction);

module.exports = router;
