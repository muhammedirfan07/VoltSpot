const { default: Stripe } = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.makePayment = async (req, res) => {
  try {
    console.log("inside the payment page m....🤑🤑🤑🤑");
    
    const { userId, stationId, price } = req.body;
    console.log("paymetDatas:",req.body);
    

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `EV Charging Slot`,
              description: `Charging Station ID: ${stationId}`,
            },
            unit_amount: price * 100, // Convert to paise
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        stationId,
      },
    });
    console.log("Stripe Session Created:", session.id);
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};