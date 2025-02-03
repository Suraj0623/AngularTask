import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task } from '../../shared/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../shared/employee.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  task: Task | null = null;
  employees: { id: number, name: string, department: string }[] = []; // Array to store employee list

  constructor(
    private service: TaskService,
    private route: ActivatedRoute,
    private employeeService:EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getTaskDetails(id);
    this.getEmployees();
  }
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.employees = employees;
      },
      (error)=>{
        console.error("Error fetching data",error);
      }
    );
  }

  getTaskDetails(id: number): void {
    this.service.getTaskById(id).subscribe(
      (task: Task) => {
        this.task = task;
      },
      (error) => {
        console.error('Error fetching task details', error);
      }
    );
  }

  onUpdateTask(): void {
    if (this.task) {
      console.log('Updating Task', this.task); // Check if the task object is correct
      this.service.updateTask(this.task.id, this.task).subscribe({
        next: (task: Task) => {
          console.log('Task updated successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error updating task', error);
        },
        complete: () => {
          console.log('Task update request complete');
        }
      });
    } else {
      console.warn('No task found to update');
    }
  }
  
}
