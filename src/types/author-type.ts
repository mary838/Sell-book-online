export type AuthorInput = {
    full_name: string;
    email: string;
    phone: string;
    dob: Date;
    nationality: string;
}

export interface IAuthor {
    _id: string;
    full_name: string;
    email: string;
    phone: string;
    dob: Date;
    nationality: string;
}