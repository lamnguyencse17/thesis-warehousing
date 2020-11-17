const express = require("express");
const router = express.Router();
import passport from "passport";

const authenticator = (req, res, next) =>
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user) {
      return res
        .status(401)
        .json({ message: "You are not logged in or cookie has expired" });
    }
    next();
  })(req, res, next);

// router.use("/groups", authenticator, require("./routes/groups"));
// router.use("/auth/signin", require("./routes/auth/signin"));

// router.use("/auth/signup", require("./routes/auth/signup"));

// router.use("/dishes", authenticator, require("./routes/dishes"));

// router.use("/orders", authenticator, require("./routes/orders"));

// router.use("/invite", authenticator, require("./routes/invite"));

router.use("/user", authenticator, require("./routes/user"));
router.use("/auth/register", require("./routes/auth/register"));
router.use("/auth/login", require("./routes/auth/login"));

module.exports = router;
