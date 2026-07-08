import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini description generation
  app.post("/api/gemini/generate-description", async (req, res) => {
    try {
      const { name, category, price, sizes, fits, colors, fabricMaterial, fabricDensity } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // Fallback for demo or if key not configured yet
        return res.json({
          description: `A premium, tailored ${category.toLowerCase() || 'apparel'} named "${name || 'Classic Garment'}", styled with high-performance ${fabricMaterial || 'Heavy Premium Cotton'}. Engineered with a modern ${fits?.[0] || 'Regular'} fit, featuring subtle luxury detailing, a comfortable drape at ${fabricDensity || '240 GSM'}, and reinforced stitching. Perfect for any contemporary, high-frequency wardrobe.`,
          warning: "Using local simulated engine. Set up your real GEMINI_API_KEY in the Secrets panel to activate live Gemini API copywriting."
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Write a high-converting, professional, retail-ready product description for a premium fashion brand (called RESTYLE). 
The item is:
- Name: "${name}"
- Category: "${category}"
- Price: $${price}
- Available Sizes: ${sizes?.join(', ') || 'S, M, L'}
- Available Fits: ${fits?.join(', ') || 'Regular'}
- Available Tones: ${colors?.join(', ') || 'Black, White'}
- Fabric: ${fabricMaterial || 'Premium Heavy Cotton'}
- Fabric Weight/Density: ${fabricDensity || '240 GSM'}

Write a rich, detailed description detailing the texture, styling recommendations, fabric blend density, comfort profile, and aesthetic. Keep it elegant, stylish, and engaging. Maximum 100 words. No formatting except single line breaks. Do not mention HTML or markdown tags.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ description: response.text });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: err.message || "Failed to generate AI description." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
