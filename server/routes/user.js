const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();

//Register a user
router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    const existUser = await User.findOne({ email: data.email });
    const existUserName = await User.findOne({ userName: data.userName });
    if (existUser || existUserName) {
      res.status(400).json({ msg: "User/Email already exists" });
    } else {
      data.password = await bcrypt.hash(data.password, 10);
      const user = await User.create(data);
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

//Login a user
router.post("/login", async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid password" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

//Add id to the movie watchlist
router.put("/:id/addm", async (req, res, next) => {
  try {
    const data = req.body;
    if (data.userId == req.params.id) {
      const checkUser = await User.findById(req.params.id);
      const cond = checkUser.movieWatchlist;
      if (cond.includes(data.movieId)) {
        res.status(200).json({ msg: "Already added" });
      } else {
        const user = await User.findByIdAndUpdate(
          req.params.id,
          {
            $push: { movieWatchlist: data.movieId },
          },
          { new: true }
        );
        res.status(200).json(user);
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
});

//Remove id from the movie watchlist
router.put("/:id/removem", async (req, res, next) => {
  try {
    const data = req.body;
    if (data.userId == req.params.id) {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { movieWatchlist: data.movieId },
        },
        { new: true }
      );
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
});

//Add id to the series watchlist
router.put("/:id/adds", async (req, res, next) => {
  try {
    const data = req.body;
    if (data.userId == req.params.id) {
      const checkUser = await User.findById(req.params.id);
      const cond = checkUser.seriesWatchList;
      if (cond.includes(data.movieId)) {
        res.status(200).json({ msg: "Already added" });
      } else {
        const user = await User.findByIdAndUpdate(
          req.params.id,
          {
            $push: { seriesWatchList: data.movieId },
          },
          { new: true }
        );
        res.status(200).json(user);
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
});

//Remove id from the series watchlist
router.put("/:id/removes", async (req, res, next) => {
  try {
    const data = req.body;
    if (data.userId == req.params.id) {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { seriesWatchList: data.movieId },
        },
        { new: true }
      );
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
});

//Get Watchlist alone
router.get("/:id/watchlists", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res
      .status(200)
      .json({ series: user.seriesWatchList, movies: user.movieWatchlist });
  } catch (error) {
    next(error);
  }
});

module.exports = router;