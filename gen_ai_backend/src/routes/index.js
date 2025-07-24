const express = require('express');
const healthController = require('../controllers/health');
const nameGeneratorController = require('../controllers/nameGeneratorController');

const router = express.Router();

// Health endpoint
/**
 * @swagger
 * /:
 *   get:
 *     summary: Health endpoint
 *     responses:
 *       200:
 *         description: Service health check passed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: development
 */
router.get('/', healthController.check.bind(healthController));

/**
 * @swagger
 * /generate-names:
 *   post:
 *     summary: Generate AI-powered app names
 *     description: Returns a list of generated names from an AI provider, or fallback stub data if API key is missing.
 *     tags: [AI Name Generator]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               n:
 *                 type: integer
 *                 description: Number of names to generate (default 10, max 20)
 *               theme:
 *                 type: string
 *                 description: (Optional) Style or theme
 *               category:
 *                 type: string
 *                 description: (Optional) Category (default 'app')
 *     responses:
 *       200:
 *         description: Returns a list of generated names
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 names:
 *                   type: array
 *                   items:
 *                     type: string
 *                 stub:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
router.post(
  '/generate-names',
  express.json(),
  nameGeneratorController.generateNames.bind(nameGeneratorController)
);

module.exports = router;
