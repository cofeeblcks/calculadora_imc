import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})

export class AppComponent {
    title = 'segundo_parcial';

    namePatient:string = "";
    agePatient:number = 0;
    sexPatient:string = "";
    weightPatient:number = 0;
    heightPatient:number =  0;
    hasData:boolean = false;
    bgTr:string = "";

    dataPatients = [
        {
            namePatient: "",
            age: 0,
            sex: "",
            weight: 0,
            height: 0,
            imc: "",
            bgTr: ""
        }
    ]

    // Creamos una funcion para redondear el valor a 2 decimales
    round = (value: number):number => { return Math.round(value * 100) / 100 }

    // Creamos una funcion para calcular el imc y retornar su rango
    calcularImc = (weight: number, height: number):string => {
        // IMC = weight / height * height
        const imc:number = height > 0 ? weight / (height ** 2) : 0;
        let rango:string = "";
        if( imc > 0 && imc < 18 ){
            rango = "Peso bajo";
            this.bgTr = "bg-info";
        }else if( imc >= 18 && imc < 25 ){
            rango = "Peso ideal";
            this.bgTr = "bg-success";
        }else if( imc >= 25 && imc < 30 ){
            rango = "Sobrepeso";
            this.bgTr = "bg-warning";
        }else if( imc >= 30 && imc < 35 ){
            rango = "Obesidadd";
            this.bgTr = "bg-danger";
        }else if( imc >= 35 && imc < 40 ){
            rango = "Obesidadd severa";
            this.bgTr = "bg-danger";
        }else if( imc >= 40 ){
            rango = "Obesidadd morbida";
            this.bgTr = "bg-danger";
        }
        return rango != "" ? this.round(imc) + " - " + rango : ""
    }

    registrarDatos = () => {
        if( this.namePatient != "" ){
            if( this.dataPatients.length == 1 && !this.hasData ){
                this.dataPatients = []
            }
            this.dataPatients.push({
                namePatient: this.namePatient,
                age: this.agePatient,
                sex: this.sexPatient,
                weight: this.weightPatient,
                height: this.heightPatient,
                imc: this.calcularImc(this.weightPatient, this.heightPatient),
                bgTr: this.bgTr
            });
            this.hasData = true;

            this.namePatient = "";
            this.agePatient = 0;
            this.sexPatient = "";
            this.weightPatient = 0;
            this.heightPatient =  0;
        }
    }
}
