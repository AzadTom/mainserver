import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {

  constructor(private readonly prisma:PrismaService){}
  async create(createTodoDto: CreateTodoDto) {
    const todo = await this.prisma.todo.create({
      data: createTodoDto,
    });
    return {
      message: 'Todo created successfully',
      data: todo,
    };
  }

  async findAll() {
    const todos = await this.prisma.todo.findMany();
    return {
      message: 'Todos fetched successfully',
      data: todos,
    };
  }

  async findOne(id: number) {

    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });

    return {
      message: 'Todo fetched successfully',
      data: todo,
    };
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.prisma.todo.update({
      where: { id },
      data: updateTodoDto,
    });

    return {
      message: 'Todo updated successfully',
      data: todo,
    };
  }

  async remove(id: number) {
    const todo = await this.prisma.todo.delete({
      where: { id },
    });

    return {
      message: 'Todo deleted successfully',
      data: todo,
    };
  }
}
