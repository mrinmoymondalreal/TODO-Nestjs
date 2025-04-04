import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(): Promise<Todo[]> {
    return this.todoService.getAll();
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getById(id);
  }

  @Post()
  createTodo(@Body() data: Partial<Todo>): Promise<Todo> {
    return this.todoService.create(data);
  }

  @Patch(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() data: Partial<Todo>,
  ): Promise<Todo> {
    return this.todoService.update(id, data);
  }

  @Patch(':id')
  completeTodo(
    @Param('id') id: string,
    @Query('done') completed: string,
  ): Promise<Todo> {
    return this.todoService.complete(id, completed === 'true');
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<void> {
    return this.todoService.delete(id);
  }
}
