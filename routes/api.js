const express = require("express");
const router = express.Router();
const productController = require('../app/controllers/productController');
const topicController = require('../app/controllers/topicController');
const userController = require('../app/controllers/userController');
const companyController = require('../app/controllers/companyController');
const auth = require('../app/middlewares/auth')

router.get('/', (req, res) => {
    res.send("Home page hit successfully")
});


/**
 *  @swagger
 *  tags:
 *    name: Topics
 *    description: API description to manage topics
 *  */

/**
 * @swagger
 *   /topics:
 *     get:
 *       summary: Get all topics
 *       tags: [Topics]
 *       responses:
 *         "200":
 *           description: The list of the topics
 *           contents:
 *             applications/json:
 *               schema:
 *                 $ref: '#/components/schemas/Topic'
 *
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "404":
 *           $ref: '#/components/responses/404'
 * */



/**
 * @swagger
 *   /topics/{topicId}:
 *     get:
 *       summary: Get a topic
 *       tags: [Topics]
 *       parameters:
 *         - in: path
 *           name: topicId
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of the topic
 *       responses:
 *         "200":
 *           description: Get a topic by Id
 *           contents:
 *             applications/json:
 *               schema:
 *                 $ref: '#/components/schemas/Topic'
 *
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "404":
 *           $ref: '#/components/responses/404'
 * */



/**
 * @swagger
 *   /topics/{topicId}:
 *     delete:
 *       summary: Delete a topic
 *       tags: [Topics]
 *       parameters:
 *         - in: path
 *           name: topicId
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of the topic
 *       responses:
 *         "200":
 *           description: Delete a topic by Id
 *           contents:
 *             applications/json:
 *               schema:
 *                 $ref: '#/components/schemas/Topic'
 *
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "404":
 *           $ref: '#/components/responses/404'
 * */

/**
 * @swagger
 *   /topics:
 *     post:
 *       summary: Add a topic
 *       tags: [Topics]
 *       requestBody:
 *         required: true
 *         content:
 *           application.json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       responses:
 *         "201":
 *           description: Topic created succesffuly
 *           contents:
 *             applications/json
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "404":
 *           $ref: '#/components/responses/404'
 * */


/**
 * @swagger
 *   /topics/{topicId}:
 *     put:
 *       summary: Update a topic by Id
 *       tags: [Topics]
 *       parameters:
 *         - in: path
 *           name: topicId
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of the topic
 *       requestBody:
 *         required: true
 *         content:
 *           application.json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *               required:
 *       responses:
 *         "204":
 *           description: Topic update successfuly
 *           contents:
 *             applications/json:
 *               schema:
 *                 $ref: '#/components/schemas/Topic'
 *
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "404":
 *           $ref: '#/components/responses/404'
 * */


//File inpit routes
router.post('/posts/register', topicController.savePost);

//Comapny routes
router.post('/companies', companyController.saveCompany);
router.get('/companies', companyController.getCompany);

//Topics routes
router.get('/topics', topicController.getTopics);
router.get('/topics/:id', topicController.getTopicsById);
router.post('/topics', topicController.saveTopics);
router.put('/topics/:id', topicController.updateTopics);

//Users routes
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUsersById);
router.post('/auth/register', userController.saveUsers);
router.post('/auth/login', userController.login);

//Product routes avec middleware de vérification du token
// router.use(auth.verifyToken)
router.get('/products', productController.getProduct);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProducts);
router.delete('/products/:id', productController.deleteProducts);
router.post('/products', productController.saveProducts);

module.exports = router
