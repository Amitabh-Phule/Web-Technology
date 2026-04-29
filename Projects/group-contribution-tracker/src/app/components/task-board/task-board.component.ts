import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent {
  @Input() projectId!: number;
  newTaskTitle = '';
  assignedMemberId: number | '' = '';

  constructor(
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  get tasks(): Task[] {
    return this.projectService.getProject(this.projectId)?.tasks || [];
  }

  get members(): Member[] {
    return this.projectService.getProject(this.projectId)?.members || [];
  }

  createTask() {
    if (this.newTaskTitle && this.assignedMemberId !== '') {
      this.taskService.createTask(this.projectId, this.newTaskTitle, +this.assignedMemberId);
      this.newTaskTitle = '';
      this.assignedMemberId = '';
    }
  }

  toggleTaskStatus(task: Task) {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    this.taskService.updateTaskStatus(this.projectId, task.id, newStatus);
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(this.projectId, taskId);
  }

  getMemberName(id: number): string {
    return this.members.find(m => m.id === id)?.name || 'Unknown';
  }
}
