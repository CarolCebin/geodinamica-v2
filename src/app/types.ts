export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Question {
  id: string;
  text: string;
  body: string | {
    content: Array<{
      nodeType: string;
      content?: Array<{
        value: string;
      }>;
    }>;
  };
  options: Array<{
    id: string;
    text: string;
  }>;
  correctOptionId: string;
  explanation: string;
}