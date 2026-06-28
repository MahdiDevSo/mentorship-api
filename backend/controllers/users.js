import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const getUsers = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

export const getUserInfo = async (req, res) => {
  const user = await User.findById(req.params.id);

  console.log("req.params.id", req.params.id);

  if (!user) return res.status(404).send("User not found jaale ");

  res.json(user);
};

export const createUser = async (req, res) => {
  console.log("req.body", req.body);

  const user = new User(req.body);
  const saved = await user.save();
  res.status(201).json(saved);
};

// Updated User
export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).send("User not found");
    }

    res.json(updateUser);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// deleted User

export const deletedUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    res.send(`User with id ${id} deleted..`);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

