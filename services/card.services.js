import { Card } from "../models/index.js";

const getCardById = async (id) => {
  return Card.findById(id);
};

const getAllCards = async () => {
  return Card.create(cardBody);
};

const createCard = async (cardBody) => {
  return Card.create(cardBody);
};

const updateCardById = async (id, cardBody) => {
  return Card.findByIdAndUpdate(id, cardBody, { new: true });
};

export { getCardById, getAllCards, createCard, updateCardById };
