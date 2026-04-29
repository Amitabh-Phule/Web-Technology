import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-member-stats',
  templateUrl: './member-stats.component.html',
  styleUrls: ['./member-stats.component.css']
})
export class MemberStatsComponent implements OnInit, DoCheck {
  @Input() projectId!: number;
  stats: any[] = [];
  editingMemberId: number | null = null;
  editMemberName = '';
  newMemberName = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.updateStats();
  }

  ngDoCheck(): void {
    // Re-calculate stats on change detection to easily catch task updates
    this.updateStats();
  }

  updateStats() {
    this.stats = this.projectService.getMemberStats(this.projectId);
  }

  trackById(index: number, item: any) {
    return item.member.id;
  }

  startEdit(memberId: number, currentName: string) {
    this.editingMemberId = memberId;
    this.editMemberName = currentName;
  }

  saveEdit() {
    if (this.editingMemberId !== null && this.editMemberName) {
      this.projectService.updateMemberName(this.projectId, this.editingMemberId, this.editMemberName);
      this.editingMemberId = null;
      this.updateStats();
    }
  }

  cancelEdit() {
    this.editingMemberId = null;
  }

  addMember() {
    if (this.newMemberName) {
      this.projectService.addMemberToProject(this.projectId, this.newMemberName);
      this.newMemberName = '';
      this.updateStats();
    }
  }
}
