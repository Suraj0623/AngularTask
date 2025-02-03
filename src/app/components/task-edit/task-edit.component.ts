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

  task: Task = {
    id: 0,
    title: '',
    description: '',
    employeeId: '',
    status: 'Pending',
    dueDate: '',
    assignedEmployee: {
      id: 0,
      name: '',
      department: ''
    }
  };
  
  employees: { id: number, name: string, department: string }[] = []; // Array to store employee list

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTask();
    this.loadEmployees();
  }

  loadTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.taskService.getTaskById(id).subscribe({
        next: (task) => {
          this.task = task;
  
          // Ensure assignedEmployee is populated if employeeId exists
          if (this.task.employeeId) {
            this.employeeService.getEmployeeById(this.task.employeeId).subscribe({
              next: (employee) => {
                this.task.assignedEmployee = employee;
              },
              error: (err) => {
                console.error('Error fetching assigned employee', err);
              }
            });
          }
        },
        error: (err) => {
          console.error('Error fetching task details', err);
        }
      });
    }
  }
  

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error fetching employees', err);
      }
    });
  }

  updateTask(): void {
    if (!this.task.assignedEmployee && this.task.employeeId) {
      const selectedEmployee = this.employees.find(e => e.id === Number(this.task.employeeId)); // Convert employeeId to number
      if (selectedEmployee) {
        this.task.assignedEmployee = selectedEmployee;
      }
    }
  
    console.log('Updating Task:', this.task); // Debugging log
  
    this.taskService.updateTask(this.task.id, this.task).subscribe({
      next: (updatedTask) => {
        console.log('Task updated successfully', updatedTask);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error updating task', err);
      },
      complete: () => {
        console.log('Task update process completed');
      }
    });
  }
  
  
}
