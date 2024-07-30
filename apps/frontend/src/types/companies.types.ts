export type Company = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
}

export type State = {
  companies: Company[];
  company: Company | null;
  loading: boolean;
  error: string;
};

