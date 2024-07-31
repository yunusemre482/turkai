export type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
}

export type Metadata = {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}

export type State = {
  employees: Employee[];
  employee: Employee | null;
  loading: boolean;
  error: string;
  metadata: Metadata
};
