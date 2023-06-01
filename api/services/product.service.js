const { fakerDE: faker } = require('@faker-js/faker');
const {Op} = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err)=> console.log(err));
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    // const newProduct = {
    //   id: faker.datatype.uuid(),
    //   ...data
    // }
    // this.products.push(newProduct);
    const newProduct = await models.Product.create(data)
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }

    const {limit, offset, price, price_min, price_max} = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    if (price){
      options.where.price = price;
    }

    if (price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      }
    }



    const products = await models.Product.findAll(options)
    //const query = 'SELECT * FROM tasks';
    //const [data] = await sequelize.query(query)

    //const rta = await this.pool.query(query)
    //return rta.rows;
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id)
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
    // try {
    //   if (product.isBlock) {
    //     throw boom.conflict('product is block');
    //   }
    // } catch (error) {
    //   throw new Error(error)

    // }
    //const product = this.products.find(item => item.id === id);
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
