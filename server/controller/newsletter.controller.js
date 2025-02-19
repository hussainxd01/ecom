const { Newsletter } = require("../model/newsletter.model");

const createNewsletter = async (email) => {
  try {
    const newsletter = new Newsletter({ email: email.toLowerCase() }); // Convert email to lowercase
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
