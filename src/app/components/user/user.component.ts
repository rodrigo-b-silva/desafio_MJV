import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { User } from './user.interface';

type UserList = Omit<User, 'email'>;
class UserFull extends User {
  dateOfBirth: string = '';
  phone: string = '';
  gender: string = ''
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  @ViewChild("buttonModalUser") buttonModalUser: ElementRef = new ElementRef(HTMLButtonElement);
  users: UserList[] = [];
  currentPage: number = 1;
  limit: number = 10;
  totalItems: number = 0;
  userAux: UserFull = new UserFull();

  constructor(
    private userService: UserService
  ) { };

  async ngOnInit(): Promise<void> {
    await this.search(1);
  }

  async search(page: number) {
    try {
      this.currentPage = page;
      const queryString = `?page=${this.currentPage - 1}&limit=${this.limit}`;
      const { data: responseUser } = await this.userService.list(queryString);
      this.users = responseUser.data;
      this.totalItems = responseUser.total;
    } catch (err) {
      console.log(err);
    }
  }

  async getUser(id: string) {
    const { data: userData } = await this.userService.get(id);
    return {
      ...userData
    }
  }

  async openModalUser(userId: string) {
    const userData = await this.getUser(userId);
    this.userAux = { ...userData };
    this.buttonModalUser.nativeElement.click();
  }

  confirmRemove(id: string) {
    Swal.fire({
      title: 'Você tem certeza que deseja remover o usuário?',
      text: 'Esta ação é irreversível!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar'
    }).then(async (result: any) => {
      if (result.value) {
        await this.remove(id);
      }
    })
  }

  async remove(id: string) {
    try {
      const { data: response } = await this.userService.delete(id);
      if (response.id) {
        Swal.fire('Removido!', 'O usuário foi removido do sistema.', 'success')
      } else {
        Swal.fire('Oops...', 'Falha ao remover o usuário. Tente novamente', 'error');
      }
    } catch (err) {
      Swal.fire('Oops...', 'Falha ao remover o usuário. Tente novamente', 'error');
      console.log(err)
    } finally {
      await this.search(1);
    }
  }
}
