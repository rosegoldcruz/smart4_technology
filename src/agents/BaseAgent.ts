export class BaseAgent {
  protected config: any;
  protected name: string;

  constructor(name: string, config: any) {
    this.name = name;
    this.config = config;
  }

  async process(message: any): Promise<any> {
    console.log(`${this.name} processing message`);
    return message;
  }

  async sendMessage(targetAgent: string, payload: any): Promise<any> {
    // Will implement simple message passing for now
    console.log(`${this.name} sending to ${targetAgent}`);
    return payload;
  }
}