import Newsletter from "../models/newsletter.model.js";

export const createNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });

    const existingEmail = await Newsletter.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    const newsletter = new Newsletter({ email: email.toLowerCase().trim() });
    await newsletter.save();

    return res
      .status(201)
      .json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
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
