export type MemberType = {
  id: string;
  membership_type: MembershipType;
  name: string;
  age: number;
  phone_number: string;
  email: string;
  address: string;
  barcode: string;
  expiry: string;
  credit: number;
};

export type MembershipType = {
  id: number;
  type: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
};

export type MemberMutationType = {
  id?: string | number;
  name: string;
  age: number;
  phone_number: string;
  email: string;
  address: string;
  membership_type_id: number;
  credit: number;
};
