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

const updateCardById = async (cardBody) => {
  return Card.create(cardBody);
};

export { getCardById, getAllCards, createCard, updateCardById };
