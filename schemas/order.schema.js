const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const productId = Joi.number().integer();
const amount =  Joi.number().integer().min(1);

const getOrderSchema = Joi.object({ id: id.required() });

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({ customerId });

const addItemSchema = Joi.object({
  orderId: id.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  addItemSchema
};
