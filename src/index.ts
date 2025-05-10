// src/index.ts
// ───────────────────────────────────────────────────────────────────────────────
// 1) Load environment variables from a custom .env file (only once at startup).
//    • dotenv.config() will not overwrite any real environment variables (production-safe).
//    • Path points to your custom .env on Windows.
import * as dotenv from 'dotenv';
dotenv.config({ path: 'C:/Users/Administrator/Contacts/.env' });

// 2) Import the ContentAgent which uses process.env.OPENAI_API_KEY
import { ContentAgent } from './ContentAgent';

/**
 * Main application entry point.
 * Instantiates the ContentAgent, generates content for a sample topic,
 * and logs the best script or errors.
 */
async function main() {
  try {
    const trendingTopic = 'AI in social media';
    console.log(`[index] Generating content for topic: ${trendingTopic}`);

    const agent = new ContentAgent();
    const script = await agent.generateContent(trendingTopic);

    console.log('[index] Best generated script:');
    console.log(script);
  } catch (error) {
    console.error('[index] Error generating content:', error);
    process.exit(1);
  }
}

// Execute main
main();