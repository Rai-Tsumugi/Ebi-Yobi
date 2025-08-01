export interface OfficialLecture {
  id: number;
  name: string;
  professor: string;
  dayOfWeek: number;
  period: number;
  termId: number;
  // 以下を追記
  isRequested?: boolean; // ログインユーザーが希望済みか
  requestCount?: number; // 全体の希望者数
}
