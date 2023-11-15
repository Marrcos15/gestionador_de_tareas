import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styles: [`
        .error{
            background-color: #ff4081;
        }
    `]
})

export class RegisterComponent {
    form: any;
    constructor(private fb: FormBuilder, private auth: AuthService){
        this.form = fb.group({
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            email: ['', [Validators.required, validEmail()]],
            password: ['', Validators.required],
            cpassword: ['', Validators.required]
        }, { validator: isntSame('password','cpassword')});
    }

    onSubmit(){
        console.log(this.form.errors);
        this.auth.register(this.form.value);
    }

    isValid(control : any){
        /* Cuando el campo no esta rellenado y cuando ya se ha pasado por este campo (se ha seleccionado pero no rellenado) */
        return this.form.controls[control].invalid && this.form.controls[control].touched
    }

    

}

function validEmail(){
    return (control: { value: string; }) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return regex.test(control.value) ? null: { invalidEmail: true }
    }
}

function isntSame(field1: any, field2: any){
    return (form: { controls: { [x: string]: { value: any; }; }; }) => {
        if (form.controls[field1].value !== form.controls[field2].value){
            return { isntSame: true}
        } else { return {isntSame: false}};
    }
}