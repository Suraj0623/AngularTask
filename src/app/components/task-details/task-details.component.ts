import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/task';
import { TaskService } from '../../shared/task.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../shared/employee.service';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class TaskDetailsComponent implements OnInit {
  taskId!: number;
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: TaskService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.taskId = +this.route.snapshot.paramMap.get('id')!; // Get task ID from route
    this.getTaskDetails();
  }

  getTaskDetails(): void {
    this.service.getTaskById(this.taskId).subscribe(
      (task: Task) => {
        this.task = task;
        if (this.task && this.task.employeeId) {
          this.getEmployeeDetails(this.task.employeeId); // Correctly check if task has employeeId
        }
      },
      (error: any) => {
        console.error('Error Fetching Task Details', error);
      }
    );
  }

  getEmployeeDetails(employeeId: string): void {
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (employee) => {
        if (this.task) {
          this.task.assignedEmployee = employee; // Assign employee to task
        }
      },
      (error) => {
        console.error("Error fetching employee data", error);
      }
    );
  }
}
