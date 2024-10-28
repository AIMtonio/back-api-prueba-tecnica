export class CreateUserDto {

    readonly id: number;
    readonly first_name: string;
    readonly last_name: string;    
    readonly date_birth: string;
    readonly address: string;
    readonly token?: string; //pendiete de definir
    readonly mobile_phone: string;
    readonly email: string;
    readonly password: string;

}
