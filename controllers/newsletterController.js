import Subscriber from "../models/Subscriber.js";

// Subscribe to the newsletter
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).send({ message: "Invalid email address." });
    }

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(409).send({ message: "Email is already subscribed." });
    }

    // Add new subscriber
    const subscriber = await Subscriber.create({ email });
    res.status(201).send({ message: "Successfully subscribed to the newsletter.", subscriber });
  } catch (error) {
    res.status(500).send({ message: "Server error.", error: error.message });
  }
};

// Get all subscribers
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).send({ message: "Subscribers retrieved successfully.", subscribers });
  } catch (error) {
    res.status(500).send({ message: "Server error.", error: error.message });
  }
};

// Delete a subscriber by ID
export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;

    const subscriber = await Subscriber.findByIdAndDelete(id);
    if (!subscriber) {
      return res.status(404).send({ message: "Subscriber not found." });
    }

    res.status(200).send({ message: "Subscriber deleted successfully." });
  } catch (error) {
    res.status(500).send({ message: "Server error.", error: error.message });
  }
};
