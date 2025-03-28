import { MemberType } from "./member";

export type AttendanceType = {
  id: number;
  member: MemberType;
  timestamp: string;
};
