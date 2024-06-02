export type MessageRole = 'user' | 'assistant';

export interface IFile {
  file_id: string;
  filename: string;
  url_local: string;
}

export interface ITemplate {
  id: number;
  name: string;
  prompt: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  text5: string;
};

export interface IMessage {
  role: MessageRole;
  content: string;
  text1?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  text5?: string;
  template?: ITemplate;
  files?: IFile[];
}

export interface IMessageResponse {
  data: string;
  files?: IFile[];
}
