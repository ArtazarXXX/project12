import { Component } from '@angular/core';
import { MyWorker, MyWorkerDatabase, MyWorkerType } from './shared/worker.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Список сотрудников';
  workers: MyWorker[] = MyWorkerDatabase;
  MyWorkerType = MyWorkerType;

  getByType(type: number){
    return this.workers.filter(worker => worker.type === type)
  }

  onDeleteWorker(id: number){
    let index = this.workers.findIndex(worker => worker.id === id)
    if (index !== -1){
      this.workers.splice(index,1);
    }
  }
  
  onAddWorker(worker: MyWorker){
    let id = this.workers.length > 0
    ? this.workers[this.workers.length - 1].id + 1
    : 0;
    worker.id = id;
    if (worker.name != null && worker.surname != null && worker.name.length > 0 && worker.surname.length > 0){ //Добавил проверку на пустые имя и фамилию через условный оператор if 
      this.workers.push(worker);
    }
  }

  onEditAccept(staffer: MyWorker){ //Редактирование записи
    setTimeout(() => { //Добавил задержку, чтобы старый объет сначала удалился из массива (таким образом, если пользователь не менял id, он не поменяется автоматически по итогу редактировния)
      let id_new = this.workers.length > 0
      ? this.workers[this.workers.length - 1].id + 1
      : 0;
      let id_old = this.workers.findIndex(worker => worker.id === staffer.id);
      if (id_old != -1 || staffer.id == null){ //Меняем введенное пользователем id, если оно уже занято или если пользователь его не ввел
        if(staffer.name != null && staffer.surname != null && staffer.name.length > 0 && staffer.surname.length > 0){
          staffer.id = id_new;
          this.workers.push(staffer);
        }
      }
      else{
        if(staffer.name != null && staffer.surname != null && staffer.name.length > 0 && staffer.surname.length > 0){
          this.workers.push(staffer);
          console.log(staffer.id);
        }
      }
    }, 100)
  }

  onDeleteOld(id: number){ //Удаляем старый объект, редактируемый пользователем со страницы
      let index = this.workers.findIndex(worker => worker.id === id)
      this.workers.splice(index, 1);
  }
}
