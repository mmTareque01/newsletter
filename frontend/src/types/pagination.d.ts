export interface PaginationParams {
  totalData: number;
  totalPage: number;
  pageNo: number;
  pageSize: number;
  next: string | null;
  previous: string | null;
}
