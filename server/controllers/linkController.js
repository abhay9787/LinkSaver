import Link from "../models/Link.js";

// Get all links for logged-in user
export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ user: req.user.id });
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new link
export const addLink = async (req, res) => {
  const { title, url, description, tags } = req.body;
  try {
    const link = await Link.create({ user: req.user.id, title, url, description, tags });
    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a link
export const updateLink = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(link);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a link
export const deleteLink = async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.json({ message: "Link deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
