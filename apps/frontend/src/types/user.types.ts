export type User = {
  id: string;
  email: string;
  roles: Role[];
}

export enum Role {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}


export type State = {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string;
};
