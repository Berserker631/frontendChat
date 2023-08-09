export interface Conversation {
  SessionID: Number;
  Message: string;
  TimeReceived: string;
  MessageID: number;
  ReadMsg: boolean;
  UserName: string;
  UserID: number;
  TargetID: number,
  IsAns?: number,
}
