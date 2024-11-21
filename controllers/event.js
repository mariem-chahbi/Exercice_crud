import Event from "../models/Event.js";

export const validateEvents = async (req, res) => {
  try {
    const { title, startDate, endDate } = req.body;

    const event = new Event({
      title,
      startDate,
      endDate,
    });

    await event.save();

    res
      .status(201)
      .json({ model: event, message: "Événement créé avec succès !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
