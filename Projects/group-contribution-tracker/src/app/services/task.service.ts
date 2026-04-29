import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private projectService: ProjectService) {}

  createTask(projectId: number, title: string, assignedTo: number) {
    const project = this.projectService.getProject(projectId);
    if (project) {
      const newId = project.tasks.length ? Math.max(...project.tasks.map(t => t.id)) + 1 : 1;
      project.tasks.push({
        id: newId,
        title,
        assignedTo,
        status: 'pending',
        projectId
      });
    }
  }

  updateTaskStatus(projectId: number, taskId: number, status: 'pending' | 'completed') {
    const project = this.projectService.getProject(projectId);
    if (project) {
      const task = project.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = status;
      }
    }
  }

  deleteTask(projectId: number, taskId: number) {
    const project = this.projectService.getProject(projectId);
    if (project) {
      project.tasks = project.tasks.filter(t => t.id !== taskId);
    }
  }
}
