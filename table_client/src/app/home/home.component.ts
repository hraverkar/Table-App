import { ITask } from './../interface/itask';
import { SnackbarService } from './../services/snackbar.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public allTask: any;
  constructor() { }



  public test = [
    {
      test1: {
        name: 'test1',
        value: 10
      },
      test2: {
        name: 'test2',
        value: 20
      }
      ,
      test3: {
        name: 'test3',
        value: 30
      }

    }, {

      test11: {
        name: 'test11',
        value: 40
      },
      test22: {
        name: 'test22',
        value: 50
      }
      ,
      test33: {
        name: 'test33',
        value: 60
      }

    }
  ]




  ngOnInit(): void {
    // for (let i = 0; i < this.test2.length; i++) {
    //   const element = this.test2[i];
    //   console.log(element);
    // }

    let total = 0;
    for (let i = 0; i < this.test.length; i++) {
      const element = this.test[i];
      Object.values(element);
      for (let i = 0; i < Object.values(element).length; i++) {
        const t = Object.values(element)[i];
        console.log(t.value);
        total += t.value;
        console.log(total);
      }
    }
  }
}

