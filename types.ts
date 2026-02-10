export interface ChatMessage {
  type: 'ai' | 'user' | 'error';
  text?: string;
  image?: string; // base64 encoded image
  isBotTyping?: boolean;
}