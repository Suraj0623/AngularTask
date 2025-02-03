import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { Task } from '../../shared/task';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterModule,DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[]=[];
  searchTerm:string='';
  filterTasks:Task[]=[];

  constructor(private service:TaskService,public router:Router){}
  ngOnInit(): void {
    this.loadTasks();
   
}
loadTasks(){
this.service.getTasks().subscribe(data => {
  this.tasks=data;
  this.filterTasks =[...this.tasks];
});
}
onSearch() {
  if (this.searchTerm.trim() === '') {
    this.filterTasks = [...this.tasks]; // Reset to all tasks
  } else {
    const searchLower = this.searchTerm.toLowerCase();
    this.filterTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower) ||
      task.status.toString().toLowerCase().includes(searchLower)
    );
  }
}
filteredTasks():Task[]{
  return this.tasks.filter(task => 
    task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.employeeId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
}
editTask(id:number){
this.router.navigate(['/edit',id]);
}
deleteTask(id:number){
  this.service.deleteTask(id).subscribe(()=> {
    this.tasks = this.tasks.filter(task => task.id !== id);
  });
}
}

