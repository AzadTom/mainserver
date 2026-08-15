import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

    constructor(private readonly prisma:PrismaService){}    
    async findAll(){

        const users = await this.prisma.user.findMany();
        return {
            status: 200,
            message: 'Users fetched successfully',
            data: users
        }
    }

}
