export interface IConversation {
  id: number;
  name: string;
  model: 'gpt-3.5-turbo' | 'gpt-4';
  updated_at: string;
}
