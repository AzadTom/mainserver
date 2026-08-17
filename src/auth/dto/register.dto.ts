import { AuthProvider } from "src/user/entities/user.entities";

export class registerDto {
    username!: string;
    email!: string;
    password!: string;
    googleId?:string;
    productName?:string;
    isActive?:boolean;
    social?:AuthProvider | null;
}

export class resetPasswordDto {
    token!: string;
    password!: string;
    comfirmpassword!: string;
}