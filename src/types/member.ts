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
