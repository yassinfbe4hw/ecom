import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      ai = new GoogleGenAI({ apiKey });
    }
  }
  return ai;
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Shopping Assistant endpoint
app.post('/api/ai-assistant', async (req, res) => {
  try {
    const { prompt, products } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const gemini = getGeminiClient();
    
    if (!gemini) {
      // Fallback recommendation if API key is not configured yet
      return res.json({
        recommendation: "Welcome to EcoBoutique! Since the AI key is being initialized, I recommend our popular Bamboo Wireless Charging Pad or Organic Cotton Tote. Both are top-rated sustainable choices!",
        suggestedProductIds: ["p-12", "p-2"]
      });
    }

    const catalogContext = Array.isArray(products) 
      ? products.map((p: any) => `- ID: ${p.id} | Name: ${p.name} | Price: $${p.price} | Category: ${p.category} | Eco Rating: ${p.ecoRating}/5 | Highlights: ${p.description}`).join('\n')
      : '';

    const systemInstruction = `You are Lumina, the AI Shopping Concierge for EcoBoutique — an eco-friendly modern lifestyle store.
Your goal is to assist customers in finding the perfect sustainable products, gift recommendations, or lifestyle advice based on our catalog.

Catalog Products:
${catalogContext}

Instructions:
1. Provide a warm, concise, and helpful response (2-4 sentences).
2. Recommend 1 to 3 specific product IDs from the catalog above that match the user's request.
3. Output MUST be valid JSON with two fields:
   - "recommendation": String message to the user explaining why these match.
   - "suggestedProductIds": Array of matching product IDs (e.g. ["p-1", "p-4"]).`;

    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `User Query: ${prompt}` }] }
      ],
      config: {
        systemInstruction,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '';
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch {
      return res.json({
        recommendation: text || "Here are a few great sustainable picks from our collection!",
        suggestedProductIds: []
      });
    }
  } catch (error: any) {
    console.error('Error in AI assistant route:', error);
    return res.status(500).json({ 
      error: 'Failed to generate recommendation',
      message: error.message || 'Server error'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EcoBoutique Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
