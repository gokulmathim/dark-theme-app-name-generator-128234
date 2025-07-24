const nameGeneratorService = require('../services/nameGenerator');

// PUBLIC_INTERFACE
/**
 * Controller for AI name generation endpoint.
 * Handles POST /generate-names
 */
class NameGeneratorController {
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
  async generateNames(req, res) {
    const { n, theme, category } = req.body || {};
    const maxN = Math.min(Number(n) || 10, 20);
    // Call the service to generate names
    const result = await nameGeneratorService.generateNames({ n: maxN, theme, category });
    if (result.error) {
      // Always send a friendly, helpful message for errors
      return res.status(502).json({
        error: result.error,
        names: [],
        stub: !!result.stub,
        message: 'We couldn\'t fetch AI-generated names right now, but you can try again soon!'
      });
    }
    return res.status(200).json(result);
  }
}

module.exports = new NameGeneratorController();
