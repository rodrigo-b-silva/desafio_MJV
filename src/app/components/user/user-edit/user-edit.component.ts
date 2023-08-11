import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.interface';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  user: User = new User();
  id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.userForm = this.formBuilder.group({
      title: [null, [this.validateSelectOption]],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      avatar: [null, Validators.required],
    });
  }

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    const userData = await this.userService.get(this.id);
    this.user = userData.data
  }

  validateSelectOption(control: AbstractControl) {
    if (!control.value || control.value == "")
      return { role: true };
    return null;
  }

  async save() {
    try {
      const response = await this.userService.update(this.id, this.user)
      const userResponse = response.data;
      if (userResponse.id) {
        Swal.fire('Parabéns', 'Usuário atualizado com sucesso', 'success');
        this.router.navigate(['/users']);
      } else {
        Swal.fire('Oops...', 'Falha ao atualizar o usuário. Tente novamente', 'error');
      }
    } catch (err) {
      console.log(err);
      Swal.fire('Oops...', 'Falha ao atualizar o usuário. Tente novamente', 'error');
    }

  }
}
