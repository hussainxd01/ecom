import Newsletter from "../models/newsletter.model.js";

export const createNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingUser = await Newsletter.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newsletter = new Newsletter({ email: email.toLowerCase() });
    await newsletter.save();
    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const fetchAllNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find();
    return res.status(200).json(newsletters);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
