let operator = null;
let inputValueMemo = 0; //guarda el total de un calculo
// busca  el valor de texto del boton
function getContentClick(event){
    const value = event.target.innerHTML;
    filterAction(value);
}

// filtrar el elemento al que se le hizo click y lo manda a la función al cual corresponda
const filterAction = value => {
    value === "0" ? addNumberInput(0) : null; 
    value === "1" ? addNumberInput(1) : null; 
    value === "2" ? addNumberInput(2) : null; 
    value === "3" ? addNumberInput(3) : null; 
    value === "4" ? addNumberInput(4) : null; 
    value === "5" ? addNumberInput(5) : null; 
    value === "6" ? addNumberInput(6) : null; 
    value === "7" ? addNumberInput(7) : null; 
    value === "8" ? addNumberInput(8) : null; 
    value === "9" ? addNumberInput(9) : null; 
    value === "," ? addNumberInput(',') : null;
    
    value === "+" ? setOperation('+') : null;
    value === "-" ? setOperation('-') : null;
    value === "X" ? setOperation('*') : null;
    value === "/" ? setOperation('/') : null;
    value === "%" ? setOperation('%') : null;
    value === "+/-" ? setOperation('+/-') : null;

    value === "=" ? calculation() : null;
    value === "AC" ? resetCalculator() : null;
}

//agregar el numero mas la coma y se quede en la patalla
function addNumberInput(value){
    const inputScreen = document.getElementsByClassName('calculator__screen')[0]; //añadir al input osea capturar el contenedor 
    const inputValue = inputScreen.value; // captura el valor como un string
    if(inputValue === "0" && inputValue.length === 1 && value !== ",")// sustituir el 0 del principio
        return inputScreen.value = value; 
    
    
    if(inputScreen.value === "" && value == ","){   //contenedor de la calculadora igual vacio
        return inputScreen.value = 0 + value;
    }
    inputScreen.value = inputValue + value; //añade N° derecha-- no los suma xq el primer valor es una string  + el parametro
}

/*// devuelve un array
document.getElementsByClassName('calculator__screen')
//mas la posicion 
document.getElementsByClassName('calculator__screen')[0]
// mas el valor y eso imprime el numero en el contenedor
document.getElementsByClassName('calculator__screen')[0].value = 5; */

// función para setear o definir los valores de calculo 
function setOperation(op){
    const inputScreenValue = document.getElementsByClassName("calculator__screen")[0].value;
    operator = op; 
    if(inputScreenValue != 0)
        calculation();
}

// funcion para calcular 
function calculation(){
    const inputScreen = document.getElementsByClassName("calculator__screen")[0];
    let valueOne = transformComaToPoint(inputValueMemo); // valor del resultado = number --- llamo a la funcion para transformar a numero 
    let valueTwo = transformComaToPoint(inputScreen.value); // valor de la pantalla = string --- llamo a la funcion para transformar a numero 
    let total = 0; 
    
    if(operator === "+" && inputScreen.value !== ""){ // operación de suma
        total = valueOne + valueTwo;
    }

    if(operator === "-" && inputScreen.value !== ""){ // operación de resta
        if(valueOne !== 0){
            total = valueOne - valueTwo;
        }else {
            total = valueTwo;
        }
    }

    if(operator === "*" && inputScreen.value !== ""){ // operación para multiplicar
        if(valueOne !== 0){
            total = valueOne * valueTwo;
        }else {
            total = valueTwo;
        }
    }

    if(operator === "/" && inputScreen.value !== ""){ // operación para dividir
        if(valueOne !== 0){
            total = valueOne / valueTwo;
        }else {
            total = valueTwo;
        }
    }

    if(operator === "%" && inputScreen.value !== ""){ // operación %
            total = valueTwo / 100;
    }

    if(operator === "+/-" && inputScreen.value !== ""){ // operación para cambiar el signo del numero
        if(valueTwo > 0){
            total = -valueTwo;
        }   
    }

    total = transformPointToComma(total);
    inputValueMemo = total;
    inputScreen.value = "";
    inputScreen.placeholder = total;  
     
}

// limpiando resultado con el boton AC
const resetCalculator = () => {
    const inputScreen = document.getElementsByClassName("calculator__screen")[0];
    inputScreen.value = 0; // resetea el valor de la pantalla 
    inputValueMemo = 0; // resetea el valor de la variable que almacena el valor 
    operator = null; 
}

// función que tranforma string a number y si tiene coma que sea punto.
function transformComaToPoint(value){    
    if(typeof value !== "number"){
        let resultTransform = value.replace(',', '.');
        return parseFloat(resultTransform); // lo trasforma a numero incluido el decimal 
    }
    return value; 
}
// tranformar de punto a coma
function transformPointToComma(value){
    let resultTransform = value.toString();
    resultTransform = resultTransform.replace('.', ',');
    return resultTransform; 
}


