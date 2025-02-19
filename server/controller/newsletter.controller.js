import Newsletter from "../models/newsletter.model.js";

const createNewsletter = async (email) => {
  try {
    const newsletter = new Newsletter({ email: email.toLowerCase() }); // Convert email to lowercase
    if (await Newsletter.findOne({ email })) {
      return { success: false, error: "Email already exists" }; // Return error response
    }
    await newsletter.save();
    return { success: true, error: null }; // Return success response
  } catch (error) {
    return { success: false, error: error.message }; // Return error response
  }
};

const fetchAllNewsletters = async () => {
  try {
    const newsletters = await Newsletter.find();
    return newsletters;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { createNewsletter, fetchAllNewsletters };
