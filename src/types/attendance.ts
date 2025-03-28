import { MemberType } from "./member";

export type AttendanceType = {
  id: number;
  member: MemberType;
  timestamp: string;
};

export type AttendaceQrType = {
  message: string;
  member: Member;
  attendance: Attendance;
};

interface Attendance {
  id: number;
  member: Member;
  timestamp: string;
}

interface Member {
  id: string;
  membership_type: Membershiptype;
  status: string;
  name: string;
  age: number;
  phone_number: string;
  email: string;
  address: string;
  barcode: string;
  expiry: string;
  credit: number;
}

interface Membershiptype {
  id: number;
  type: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
}
