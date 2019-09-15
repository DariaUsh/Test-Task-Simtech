class Model {
  constructor() {}
}

class View {
  constructor() {
  }
 
  onKeyPressNumberInput(key){
	if(key!=" " && !isNaN(key)){
		return;
	}
	event.preventDefault();
  }
  
  onKeyPressCreditCard(key, element){
	if(key!=" " && !isNaN(key)){
		let length = $(element).val().length + 1;
	  	if(length < 20 && length%5 == 0){
			$(element).val($(element).val() + " ");
		}
		return;
	}
	event.preventDefault();
  }
  
  onChangeNumberInput(element){
	  let value = $(element).val();
	  if((/\s?\d+\s?/).test(value)){
		  $(element).val(value.trim());
		  return;
	  }
	  $(element).val("");
  }
  
  onChangeCreditCard(element){
	let value = $(element).val();
	if((/(\s?\d{4}\s\d{4}\s\d{4}\s\d{4}\s?)|(\s?\d+\s?)/).test(value) ){
		let symbolsGroup = value.replace(/[^\d]/g, '').match(/\d{4}/g);
		let formatStr = "";
		for(let i=0; i<4; i++){
			formatStr += symbolsGroup[i] + " ";
		}
		$(element).val(formatStr.trim());
		return;
	}
	$(element).val("");
  }
  
  showTermsConditions(){
	  $('.terms-conditions').modal('show');
  }
  
  calculationAmount(){
	  console.log("load ",  $(".product__item-price"));
	  let amount = 0;
	  $(".product__item-price").each((i, item)=>{
		 amount += Number($(item).text().replace("$", ""));
	  });
	  
	  if(!isNaN(amount)){
		  let buttonText = $("button.place-order").text() + " ( $" + amount + " )";
		 $("button.place-order").text(buttonText); 
	  }
  }

  bindShowTC(handler){
	  $(".accept-agreements a").on('click', event=>{
		  handler();
	  })
  }
  
  bindOnKeyPressNumberInput(handler) {
	$(".payment__form-code input").on('keypress', event=>{
		handler(event.key);
	})
	$(".payment__form-input-valid-thru #mm").on('keypress', event=>{
		handler(event.key);
	})
	$(".payment__form-input-valid-thru #yy").on('keypress', event=>{
		handler(event.key);
	})
  }
  
  bindOnKeyPressCreditCard(handler) {
	$(".payment__form-input-card-number input").on('keypress', event=>{
		handler(event.key, event.currentTarget);
	})
  }
  
  bindOnChangeCreditCard(handler) {
	$(".payment__form-input-card-number input").on('change', event=>{
		handler(event.currentTarget);
	})
  }
  
  bindCalculationAmount(handler) {
	$(".checkout .products").on('load', event=>{
		handler();
	})
  }
  
  bindOnChangeNumberInput(handler) {
	$(".payment__form-code input").on('change', event=>{
		handler(event.currentTarget);
	})
	$(".payment__form-input-valid-thru #mm").on('change', event=>{
		handler(event.currentTarget);
	})
	$(".payment__form-input-valid-thru #yy").on('change', event=>{
		handler(event.currentTarget);
	})
  }
  
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
	
	this.view.bindShowTC(this.onShowTermsConditions);
	this.view.bindOnKeyPressNumberInput(this.onKeyPressNumberInput);
	this.view.bindOnKeyPressCreditCard(this.onKeyPressCreditCard);
	this.view.bindOnChangeCreditCard(this.onChangeCreditCard);
	this.view.bindCalculationAmount(this.calculationAmount);
	this.view.bindOnChangeNumberInput(this.onChangeNumberInput);
	
	this.calculationAmount();
  }
  
  onShowTermsConditions = () => {
    this.view.showTermsConditions()
  }
  
  onKeyPressNumberInput = (value) =>{
	this.view.onKeyPressNumberInput(value);
  }
  
  onKeyPressCreditCard = (value, element) =>{
	this.view.onKeyPressCreditCard(value, element);
  }
  
  onChangeCreditCard = (value) =>{
	this.view.onChangeCreditCard(value);
  }
  
  calculationAmount = () =>{
	  this.view.calculationAmount();
  }
  
  onChangeNumberInput = (value) =>{
	  this.view.onChangeNumberInput(value);
  }
}

const app = new Controller(new Model(), new View());