export interface ICategory {
  _id?: string;
  name: string;
  description?: string;
  createdBy: string; // userId
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
  createdBy: string; // userId
}

export interface CategoryResult {
  success: boolean;
  data: ICategory | ICategory[] | null;
  message?: string;
}
