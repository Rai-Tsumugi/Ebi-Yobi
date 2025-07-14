export interface User {
  id: string;
  university_email: string;
  name: string | null;
  role: 'USER' | 'ADMIN';
  createdAt: string; // ISO 8601形式の文字列
  updatedAt: string; // ISO 8601形式の文字列
}