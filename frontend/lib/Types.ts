
export interface register{
    name: string;
    email: string;
    password: string;
    gender: string;
    department: string;
    grNumber: string;
    phone: string;
    address:string;
    className: string;
}

export const RegisterInitalValue = {
    name: "",
    email: "",
    password: "",
    gender: "",
    department: "",
    grNumber: "",
    phone: "",
    address: "",
    className: ""
}

export interface options {
    name: string,
    value: string,
    label: string
}