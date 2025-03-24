const request = require('supertest');

const app = require('../../src/app');


describe('Product API Routes', () => {

  const validApiKey = 'test-api-key';


  describe('GET /api/products', () => {

    it('should return 401 if no API key is provided', async () => {

      const res = await request(app).get('/api/products');

      expect(res.statusCode).toEqual(401);

    });


    it('should return a list of products with a valid API key', async () => {

      const res = await request(app)

        .get('/api/products')

        .set('X-API-Key', validApiKey);

      expect(res.statusCode).toEqual(200);

      expect(res.body).toHaveProperty('products');

      expect(Array.isArray(res.body.products)).toBe(true);

    });

  });


  describe('GET /api/products/:id', () => {

    it('should return 404 for a non-existent product', async () => {

      const res = await request(app)

        .get('/api/products/999')

        .set('X-API-Key', validApiKey);

      expect(res.statusCode).toEqual(404);

    });

  });


  describe('POST /api/products', () => {

    it('should create a new product', async () => {

      const newProduct = {

        name: 'Smartphone',

        price: 699.99,

        category: 'electronics',

        stockCount: 50,

      };

      const res = await request(app)

        .post('/api/products')

        .set('X-API-Key', validApiKey)

        .send(newProduct);

      expect(res.statusCode).toEqual(201);

      expect(res.body).toHaveProperty('id');

    });


    it('should return 400 for invalid product data', async () => {

      const res = await request(app)

        .post('/api/products')

        .set('X-API-Key', validApiKey)

        .send({});

      expect(res.statusCode).toEqual(400);

    });

  });


  describe('PUT /api/products/:id', () => {

    it('should update an existing product', async () => {

      const updatedProduct = {

        name: 'Updated Laptop',

        price: 899.99,

        category: 'electronics',

        stockCount: 30,

      };

      const res = await request(app)

        .put('/api/products/1')

        .set('X-API-Key', validApiKey)

        .send(updatedProduct);

      expect(res.statusCode).toEqual(200);

    });

  });


  describe('DELETE /api/products/:id', () => {

    it('should delete a product and return success message', async () => {

      const res = await request(app)

        .delete('/api/products/1')

        .set('X-API-Key', validApiKey);

      expect(res.statusCode).toEqual(200);

    });

  });


  

});