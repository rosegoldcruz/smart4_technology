import express, { Request, Response } from 'express';
import { ContentAgent, Script } from './ContentAgent';

const app = express();
app.use(express.json());

const agent = new ContentAgent();

app.post('/generate', async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing "prompt" in body' });
  }
  try {
    const script = await agent.generateContent(prompt);
    return res.json(script);
  } catch (err) {
    console.error('Generate error:', err);
    return res.status(500).json({ error: 'Content generation failed' });
  }
});

app.post('/publish', async (req: Request, res: Response) => {
  const script: Script = req.body;
  if (!script?.content || !script.id) {
    return res.status(400).json({ error: 'Invalid script object' });
  }
  const result = await agent.publishContent(script);
  if (result.reviewStatus === 'needs_revision') {
    return res.json({ status: 'needs_revision' });
  }
  return result.success
    ? res.json({ status: 'published' })
    : res.status(500).json({ status: 'failed' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
