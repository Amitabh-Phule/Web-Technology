import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [];

  getProjects() {
    return this.projects;
  }

  getProject(id: number) {
    return this.projects.find(p => p.id === id);
  }

  createProject(name: string, members: string[]) {
    const newId = this.projects.length ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
    const projectMembers = members.filter(m => m.trim().length > 0).map((m, i) => ({ id: newId * 100 + i, name: m.trim() }));
    const newProject: Project = {
      id: newId,
      name,
      members: projectMembers,
      tasks: []
    };
    this.projects.push(newProject);
    return newProject;
  }

  getMemberStats(projectId: number) {
    const project = this.getProject(projectId);
    if (!project) return [];

    const totalTasks = project.tasks.length;
    
    return project.members.map(member => {
      const completedTasks = project.tasks.filter(t => t.assignedTo === member.id && t.status === 'completed').length;
      
      const contribution = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
      
      let status = 'Critical';
      if (contribution >= 40) status = 'Active';
      else if (contribution >= 20) status = 'Moderate';

      return {
        member,
        contribution,
        status,
        warning: contribution < 20
      };
    });
  }

  updateMemberName(projectId: number, memberId: number, newName: string) {
    const project = this.getProject(projectId);
    if (project && newName.trim().length > 0) {
      const member = project.members.find(m => m.id === memberId);
      if (member) {
        member.name = newName.trim();
      }
    }
  }

  addMemberToProject(projectId: number, newName: string) {
    const project = this.getProject(projectId);
    if (project && newName.trim().length > 0) {
      const newId = project.members.length ? Math.max(...project.members.map(m => m.id)) + 1 : 1;
      project.members.push({ id: newId, name: newName.trim() });
    }
  }
}
