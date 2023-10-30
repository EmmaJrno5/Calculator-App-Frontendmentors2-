class Calculator{
  constructor(previousOperandElement,currentOperandElement){
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }
  handleButtonClick(button){
    const value = button.getAttribute("data-value");
    if(!isNaN(value) || value === "0" || value === "."){
      this.appendNumber(value);
      this.updateDisplay();
    }
   else if(value === "+" || value === "-" || value === "/" || value === "*"){
      this.chooseOperator(value)
    }
    else if(value === "="){
      this.calculateResult();
      this.updateDisplay();
    }
    else if(value === "Del"){
      this.deleteValue();
      this.updateDisplay();
    }
    else if(value === "C"){
      this.clear();
      this.updateDisplay()
    }
  }
  
  clear(){
    this.currentOperand = "";
    this.previousOperand = "";
    this.operator = "";
  }
  
  appendNumber(number){
    if(number === "." && this.currentOperand.toString().includes(".")) return;
    this.currentOperand = this.currentOperand + number;
  }
  deleteValue(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }
  chooseOperator(operator){
    if(this.currentOperand === "") return;
    if(this.previousOperand !== ""){
      this.calculateResult();
    }
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  calculateResult(){
    let finalResult;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(curr)) return;
    switch(this.operator){
      case "+":
       finalResult = prev + curr;
       break;
      case "-":
       finalResult = prev - curr;
       break;
      case "/":
       finalResult = prev / curr;
       break;
      case "*":
       finalResult = prev * curr;
       break;
      default:
      return;
       
    }
    this.currentOperand = finalResult;
    this.operator = "";
    this.previousOperand = "";
    
  }
  getDisplayNumber(number){
    const stringNumber = number.toString();
    
    const integerDigits = stringNumber.split(".")[0];
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if(isNaN(integerDigits)){
      integerDisplay = " ";
    }
    else{
      integerDisplay = integerDigits.toLocaleString("en",{maximumFractionDigits : 0})
      
    }
    if(decimalDigits != null){
      return `${integerDigits}.${decimalDigits}`
    }
    else{
      return integerDisplay
    }
    
  
  }
  updateDisplay(){
   
    this.currentOperandElement.value = this.getDisplayNumber(this.currentOperand);
    if(this.operator !== null){
      this.previousOperandElement.value = `${this.previousOperand} ${this.operator}`;
    }
    
    
  }
  
}
const previousOperandElement = document.querySelector("#previous-operand");
const currentOperandElement = document.querySelector("#current-operand");

const calculator = new Calculator(previousOperandElement,currentOperandElement);

const buttons = document.querySelectorAll("button");
        buttons.forEach(button => {
            button.addEventListener("click", () =>{
              calculator.handleButtonClick(button);
            }) 
              
        });



  const themeNumbers = document.querySelectorAll(".theme-number");
const calculatorBody = document.querySelector(".calculator-body");
const themeTogglerBtn = document.querySelector(".theme-toggler-button")

    themeNumbers.forEach(theme=>{
      theme.addEventListener("click",()=>{
        calculatorBody.classList.remove("theme-1","theme-2","theme-3");
        themeTogglerBtn.classList.remove("first-theme","second-theme","third-theme");
        const themeNumber = theme.getAttribute("data-number");
        calculatorBody.classList.add(`theme-${themeNumber}`)
        if(themeNumber === "1"){
          themeTogglerBtn.classList.add("first-theme")
        }
        if(themeNumber === "2"){
          themeTogglerBtn.classList.add("second-theme")
        }
        if(themeNumber === "3"){
          themeTogglerBtn.classList.add("third-theme")
        }
      })
    })
