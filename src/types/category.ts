export interface ICategory {
  _id?: string;
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
  data?: ICategory | ICategory[] | null;
  message?: string;
}
