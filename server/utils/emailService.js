import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOrderConfirmationEmail = async ({
  to,
  orderId,
  orderDetails,
}) => {
  const itemsList = orderDetails.items
    .map(
      (item) => `
      - ${item.product.name} (${item.size})
      Quantity: ${item.quantity}
      Price: ₹${item.product.price * item.quantity}
    `
    )
    .join("\n");

  const emailContent = `
    Thank you for your order!

    Order ID: ${orderId}

    Order Details:
    ${itemsList}

    Total: ₹${orderDetails.total}

    Shipping Information:
    ${orderDetails.shippingInfo.fullName}
    ${orderDetails.shippingInfo.address}
    ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.state} ${orderDetails.shippingInfo.zipCode}
    ${orderDetails.shippingInfo.country}

    We'll notify you when your order ships.

    If you have any questions, please contact our customer service.
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: `Order Confirmation - #${orderId}`,
    text: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
