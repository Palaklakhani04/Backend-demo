export interface userRegisterType {
    name: string;
    email: string;
    password: string;
    gender: "Male" | "Female" | "Other" ;
    image: string;
    grNumber?: string;
    phone: string;
    address: string;
    department?: string;
    className?: string;
    roleId: number;
}