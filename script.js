const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// this is creating a userdefined inbuilt function to check it is valid email
String.prototype.isEmail = function() {
    return !!this.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
}

// this is creating a userdefined inbuilt function to check it is having only alphabet
String.prototype.isAlpha = function(){
    return !!this.match(/^[a-zA-Z]*$/);
}

function checkEmail(input){
    if(!input.value.trim().isEmail()){
        errorInput(input,"This is not a valid Email address");
    }
}

function checkAlpha(input){
    if (!input.value.trim().isAlpha()){
        errorInput(input,"Numbers are not allowed in Username")
    }
}

// here all array elements pass through as paramater in this inputsArray
// using for each it separated each array element in input
// And checking it is empty or not if empty calling errorInput function passing same input and to show error by calling another function getId which gets the respective error from the id
function checksRequired(inputsArray){
    inputsArray.forEach((input)=>{
        // console.log(input.parentElement);
        if(input.value.trim()==""){
            errorInput(input,`${getId(input)} is Required`);
        }
        else{
            successInput(input);
        }
    });
}


// gettng id of the input through two methods one is directly with id another one is directly getting value from the input tag using getAttribute
function getId(input){
    // return input.id
    return input.getAttribute("data-value");
}

// here using input with parentElement accessing parent Element directly to show error using 'p' tag which is inside the parentElement
function errorInput(input,message){
    // console.log(input)
    const formGroup=input.parentElement;
    formGroup.className="form-group error";
    const p=formGroup.querySelector("p");
    p.innerHTML = message;
}

function successInput(input){
    const formGroup=input.parentElement;
    formGroup.className="form-group success";
    // const p = formGroup.querySelector("p");
    // p.innerHTML = "";
}
function checkLength(input,min,max){
    const data = input.value.trim().length;
    if(data < min){
        errorInput(input,`${getId(input)} must be atleast greater than ${min} characters`);
    }
    else if(data > max){
        errorInput(input,`${getId(input)} must be atleast lesser than ${max} characters`);
    }
    else{
        successInput(input);
    }
}


// the data of userdefined is inside the password.value and accessing it with a value variable
function checkAndConfirm(password,password2){
    if(password.value != password2.value){
        errorInput(password2, `${getId(password2)} does not match with password`)
    }
}

form.addEventListener("input",function(e){
    setTimeout(()=>{
    checksRequired([username,email,password,password2]);
    checkLength(username,6,12);
    checkLength(password,6,12);
    checkLength(password2,6,12);
    checkAndConfirm(password,password2);
    checkEmail(email);
    checkAlpha(username);
    },3000);
    
})

form.addEventListener("submit",function(e){
    e.preventDefault();
    // console.log("function called");
})
