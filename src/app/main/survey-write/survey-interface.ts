export interface idData {
  id: number;
  name: string;
  phone: string;
  email: string;
  age: number;
}

export interface surveyData {
  surveyId: number;
  questionData: Data[];
}

export interface Data {
  questionId: number;
  questionTitle: string;
  questiontype: string;
  questionMust: boolean;
  questionContent: string;
}


