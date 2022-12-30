import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../service/account/account.service';
import { AlertService } from '../service/alert/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogElements } from '../components/dialog/dialog-element.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [DialogElements]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    public dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .register(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.dialog.open(DialogElements, {
            data: {
              title: 'registro exitoso',
              msg: 'ahora puedes iniciar sesión',
            }
          }).afterClosed().subscribe(() => {
            this.router.navigate(['../login'], { relativeTo: this.route });
          });
        },
        error: (error) => {
          this.alertService.error('Problemas en el formulario de registro');
          this.loading = false;
        },
      });
  }
}
