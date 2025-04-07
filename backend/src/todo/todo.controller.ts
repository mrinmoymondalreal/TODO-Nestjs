import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { AuthGaurd } from 'src/auth/guards/auth.gaurd';

@Controller('todo')
@UseGuards(AuthGaurd)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(@Request() req): Promise<Todo[]> {
    return this.todoService.getAll(req.user.id);
  }

  @Get(':id')
  async getTodoById(@Request() req, @Param('id') id: string): Promise<Todo> {
    return this.todoService.getById(req.user.id, id);
  }

  @Post()
  async createTodo(@Request() req, @Body() data: Partial<Todo>): Promise<Todo> {
    return await this.todoService.create(req.user, data);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() data: Partial<Todo>,
    @Request() req,
  ): Promise<Todo> {
    return this.todoService.update(req.user.id, id, data);
  }

  @Patch(':id')
  async completeTodo(
    @Param('id') id: string,
    @Query('done') completed: string,
    @Request() req,
  ): Promise<Todo> {
    return this.todoService.complete(req.user.id, id, completed === 'true');
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string, @Request() req): Promise<void> {
    return this.todoService.delete(req.user.id, id);
  }
}
