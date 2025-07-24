const axios = require('axios');

// PUBLIC_INTERFACE
/**
 * Generates app names using OpenAI or returns stub data if OPENAI_API_KEY is absent.
 * @param {Object} options Options for name generation (prompt, n, etc.)
 * @returns {Promise<{ names: string[], stub: boolean, error?: string }>}
 */
async function generateNames(options = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  const n = Number(options.n) || 10;
  const theme = options.theme || 'modern';
  const category = options.category || 'app';

  if (!apiKey) {
    // Fallback: stub names
    console.warn('[NameGeneratorService] OPENAI_API_KEY not set. Using stub data.');
    return {
      names: [
        'Lumino',
        'Visia',
        'Quantu',
        'NebulaCore',
        'Zenbyte',
        'Invox',
        'Synthara',
        'Prismark',
        'CodeForge',
        'Optivis'
      ].slice(0, n),
      stub: true
    };
  }

  try {
    // Prepare prompt and call OpenAI API
    const prompt = `Suggest ${n} unique, catchy ${theme} ${category} names that are creative, short, brandable (one word or two words, no spaces). Only list names, comma separated.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {role: 'system', content: 'You are a creative name generator for apps.'},
          {role: 'user', content: prompt}
        ],
        max_tokens: 200
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract names from OpenAI response
    const choices = response?.data?.choices;
    let allNames = [];
    if (choices && choices[0] && choices[0].message && choices[0].message.content) {
      // OpenAI may return comma or newline separated, split smartly
      allNames = choices[0].message.content
        .replace(/\n/g, ',')
        .split(',')
        .map(x => x.replace(/^[0-9\.\)\-]+/, '').trim())
        .filter(Boolean)
        .slice(0, n);
    }

    return {
      names: allNames,
      stub: false
    };
  } catch (error) {
    console.error('[NameGeneratorService] Error contacting OpenAI API:', error?.response?.data || error.message);
    return {
      names: [],
      stub: false,
      error: 'AI provider error'
    };
  }
}

module.exports = {
  generateNames,
};
