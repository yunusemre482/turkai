export type Employee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
}


export type State = {
  employees: Employee[];
  employee: Employee | null;
  loading: boolean;
  error: string;
};
