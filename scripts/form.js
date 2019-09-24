class Model {
  constructor() {}
}

class View {
  constructor() {
  }
 
  _validFun(key, value){
	 if(key == "cvv"){
		 if(value.toString().length < 3){
			 return false;
		 }else{
			 return true;
		 }
	 }	
	 
	 if(key == "month"){
		 if(value > 12 || value <= 0){
			 return false;
		 }
	 }
	 
	 let currentYear = parseInt(new Date().getFullYear().toString().substr(2,2));
	 if(key == "year"){
		 if(value > currentYear + 10 || value < currentYear){
			 return false;
		 }
	 }
	 
	 let year = $(".payment__form-input-valid-thru #yy").val();
	 let currentMonth = new Date().getMonth() + 1;
	 if(key == "month" && year.trim() != '' && !isNaN(year) && parseInt(year) == currentYear){
		 if(value < currentMonth){
			 return false;
		 }
	 }
	 
	 let month = $(".payment__form-input-valid-thru #mm").val();
	 if(key == "year" && month.trim() != '' && !isNaN(month) && !isNaN(year) && parseInt(year) == currentYear){
		 if(month < currentMonth){
			 return false;
		 }
	 }	 
	 return true;
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
  
  onChangeNumberInput(element, key){
	  let value = $(element).val();
	  if(!isNaN(value)){
		if(this._validFun(key, parseInt(value))){
			$(element).val(value.trim());
			return;
		} 
	  }
	  $(element).val("");
  }
  
  onChangeCreditCard(element){
	let value = $(element).val();
	if(value.length == 19 && (/(\d{4}\s\d{4}\s\d{4}\s\d{4})/).test(value) ){
		let symbolsGroup = value.replace(/[^\d]/g, '').match(/\d{4}/g);
		let formatStr = "";
		for(let i=0; i<4; i++){
			if(!isNaN(symbolsGroup[i])){
				formatStr += symbolsGroup[i] + " ";
			}else{
				$(element).val("");
				return;
			}		
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
		handler(event.currentTarget, "cvv");
	})
	$(".payment__form-input-valid-thru #mm").on('change', event=>{
		handler(event.currentTarget, "month");
	})
	$(".payment__form-input-valid-thru #yy").on('change', event=>{
		handler(event.currentTarget, "year");
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
  
  onChangeNumberInput = (value, validKey) =>{
	  this.view.onChangeNumberInput(value, validKey);
  }
}

const app = new Controller(new Model(), new View());