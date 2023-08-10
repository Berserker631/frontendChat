export interface Conversation {
  SessionID: number;
  Message: string;
  TimeReceived: string;
  MessageID: number;
  ReadMsg: boolean;
  UserName: string;
  UserID: number;
  TargetID: number,
  IsAns?: number,
  AnswerTo?: string;
}
