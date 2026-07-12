export type SearchInput = {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: 'asc' | 'desc';
  filter?: string;
};
