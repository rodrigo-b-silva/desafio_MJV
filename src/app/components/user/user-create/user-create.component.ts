import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  user: User = new User();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  invalidUser() {
    return (
      !this.user.firstName ||
      !this.user.lastName ||
      !this.user.email
    )
  }

  async save() {
    try {
      const response = await this.userService.create(this.user)
      const userResponse = response.data;
      if (userResponse.id) {
        Swal.fire('Parabéns', 'Usuário criado com sucesso', 'success');
        this.router.navigate(['/users']);
      } else {
        Swal.fire('Oops...', 'Falha ao criar o usuário. Tente novamente', 'error');
      }
    } catch (err) {
      console.log(err)
      Swal.fire('Oops...', 'Falha ao criar o usuário. Tente novamente', 'error');
    }
  }
}
