import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MyWorker, MyWorkerType } from 'src/app/shared/worker.model';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css']
})
export class TableWorkersComponent implements OnInit {

  name: string;
  surname: string;
  worker_id: number;
  type = 0;

  myWorkertype = MyWorkerType;

  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  @Output() deleteWorker = 
  new EventEmitter<number>();
  @Output() editAccept = 
  new EventEmitter<MyWorker>();
  @Output() deleteOld =
  new EventEmitter<number>();
  id = -1;

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteWorker(id: number){
    this.deleteWorker.emit(id)
  }

  onEditWorker(id: number){
    this.id = id;
  }

  onEditAccept(){
    if (this.name != null && this.surname != null){
      let staffer: MyWorker = {
        name: this.name,
        surname: this.surname,
        type: this.type,
        id: this.worker_id
      }
      let old_id = this.id
      this.editAccept.emit(staffer);
      this.deleteOld.emit(old_id);
      this.id = -1;
    }
  }
}
