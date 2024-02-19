import Payment from "../models/paymentSchema.js";

export const payment = async (req, res, next) => {
  try {
    const { formData, price } = req.body;

    const paymentInstance = await Payment.create({ ...formData, price });

     await paymentInstance.save();

    res.status(200).json({ message: 'Payment information saved successfully!', paymentInstance });

  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};
