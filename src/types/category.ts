export interface ICategory {
  _id?: string; // MongoDB uses _id
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

export interface CategoryResult {
  success: boolean;
  data: ICategory | null;
  message?: string;
}
