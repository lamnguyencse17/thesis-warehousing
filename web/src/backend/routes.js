const express = require("express");
const router = express.Router();
import passport from "passport";

const authenticator = (req, res, next) =>
	passport.authenticate("jwt", { session: false }, (err, user) => {
		if (process.env.TEST_TYPE === "unit"){
			req._id = req.body.owner ? req.body.owner : req.body.sender;
			return next();
		}
		if (!user) {
			return res
				.status(401)
				.json({ message: "You are not logged in or cookie has expired" });
		}
		next();
	})(req, res, next);

router.use("/user", authenticator, require("./routes/user"));
router.use("/assets", authenticator, require("./routes/asset"));
router.use("/transactions",authenticator, require("./routes/transaction"));
router.use("/auth/register", require("./routes/auth/register"));
router.use("/auth/login", require("./routes/auth/login"));

module.exports = router;
