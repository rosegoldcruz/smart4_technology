import dotenv from 'dotenv';
dotenv.config({ path: 'C:\\Users\\Administrator\\Contacts\\.env' });

import snoowrap from 'snoowrap';
import { BaseAgent } from './BaseAgent';

export class TrendAgent extends BaseAgent {
  private redditClient: snoowrap;

  constructor(config: any) {
    super('TrendAgent', config);
    this.initRedditClient();
  }

  private initRedditClient() {
    this.redditClient = new snoowrap({
      userAgent: 'TrendMonitorApp',
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD
    });
  }

  async findTrends(): Promise<any[]> {
    const niches = ['tiktoktrends', 'videos', 'viral'];
    const trends: any[] = [];

    for (const niche of niches) {
      try {
        const posts = await this.redditClient.getSubreddit(niche).getHot({limit: 25});
        const filteredPosts = posts
          .filter((post: any) => post.score > 100) 
          .map((post: any) => ({
            source: 'reddit',
            title: post.title,
            score: post.score,
            url: post.url,
            created: post.created_utc,
            revenueScore: this.calculateRevenueScore(post)
          }));
        trends.push(...filteredPosts);
      } catch (error) {
        console.error(`Error fetching trends from ${niche}:`, error);
      }
    }

    return trends.sort((a, b) => b.revenueScore - a.revenueScore);
  }

  private calculateRevenueScore(postData: any): number {
    const baseScore = postData.score / 100;
    const commentMultiplier = postData.num_comments > 50 ? 1.5 : 1;
    const awardMultiplier = postData.total_awards_received > 0 ? 1.3 : 1;

    const keywords = ['tiktok', 'trending', 'viral', 'challenge']; 
    const titleKeywordDensity = keywords.filter(kw => postData.title.toLowerCase().includes(kw)).length;
    const textKeywordDensity = keywords.filter(kw => postData.selftext.toLowerCase().includes(kw)).length;
    const keywordMultiplier = (titleKeywordDensity + textKeywordDensity) > 2 ? 1.2 : 1;

    return baseScore * commentMultiplier * awardMultiplier * keywordMultiplier;
  }

  async process(message: any): Promise<any> {
    const trends = await this.findTrends();

    const trendsJson = JSON.stringify(trends.slice(0, 10), null, 2);

    return {
      trendsJson,
      timestamp: new Date().toISOString()  
    };
  }
}