export interface Category {
    id: string;
    name: string;
    description: string;
  }
  
  export interface Question {
    id: string;
    text: string;
    body: any;
    options: Array<{
      id: string;
      text: string;
    }>;
    correctOptionId: string;
    explanation: string;
  }