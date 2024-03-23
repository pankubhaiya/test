import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { User } from './user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  newUser: User = {
    userName: '',
    designation: '',
    salary: 0,
  };
  users: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }
  // users : User[] = [];

  onSubmit(newUser: any) {
    this.users.push({ ...this.newUser });
    this.http
      .post('https://masaieval-default-rtdb.firebaseio.com/users.json', newUser)
      .subscribe((res) => {
        console.log(res, 'POST API');
        //to make the form empty after submitting the data
        this.newUser = { userName: '', designation: '', salary: 0 };
      });
  }

  //fetching data realtime...>>>>

  fetchUsers() {
    this.http
      .get('https://masaieval-default-rtdb.firebaseio.com/users.json')
      .subscribe((res) => {
        console.log(res);
      });
  }
}
