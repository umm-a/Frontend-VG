const validRegexName = /^[a-zA-Z-åäöÅÄÖ]+(([',. -][a-zA-Z-åäöÅÄÖ ])?[a-zA-Z-åäöÅÄÖ]*)*$/; 
const validRegexMail = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/; 
const validRegexPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s/0-9]*$/g; 
const validRegexStreet = /^[A-Za-z0-9-åäöÅÄÖ_]+[A-Za-z0-9åäöÅÄÖ _]*$/; //vissa adresser har ej gatunumer - frivilligt!
const validRegexPostal =/^[0-9]{3}\s{1}[0-9]{2}$/;
const validRegexCity = /^[a-zA-Z-åäöÅÄÖ]+(([,. -][a-zA-Z-åäöÅÄÖ ])?[a-zA-Z-åäöÅÄÖ]*)*$/; 
//const validRegexCity2 = /^[a-zA-Z\s-åäöÅÄÖ]*$/;
//const validRegexCity = /^[A-Za-z-åäöÅÄÖ_]*[A-Za-z[A-Za-z _]*$/;

clear.addEventListener("click", e => {
    clearCart(e);
})

function clearCart(e){
    e.preventDefault();
    window.location.href = "index.html";
    localStorage.clear();
}


function checkValid(ifStatement, htmlVar, variable){
    if (variable.length==0){
        document.getElementById(htmlVar).classList.remove("input-not-correct");
        document.getElementById(htmlVar).classList.remove("input-correct");
        document.getElementById(htmlVar).classList.add("white-field");
        return false;
    } else if (ifStatement){
        document.getElementById(htmlVar).classList.remove("white-field");
        document.getElementById(htmlVar).classList.remove("input-not-correct");
        document.getElementById(htmlVar).classList.add("input-correct");
        return true;
    } else {
        document.getElementById(htmlVar).classList.remove("white-field");
        document.getElementById(htmlVar).classList.remove("input-correct");
        document.getElementById(htmlVar).classList.add("input-not-correct");
        return false;
    }
}

function sendToOrdered(){
    window.location.href = "ordered.html";
}

document.addEventListener('keyup', () => {
    var phone = document.getElementById("phoneNumber").value;
    var name = document.getElementById("name").value;
    var mail = document.getElementById("mail").value;
    var street = document.getElementById("streetAddress").value;
    var city = document.getElementById("city").value;
    var postal = document.getElementById("postal").value;
    checkValid(name.match(validRegexName) && 1 < name.length && name.length < 51, "name", name);
    checkValid(mail.match(validRegexMail) && mail.length < 51, "mail", mail);
    checkValid(phone.match(validRegexPhone) && phone.length < 51, "phoneNumber", phone);
    checkValid(street.match(validRegexStreet) && street.length < 51 && street.length > 3, "streetAddress", street);
    checkValid(city.match(validRegexCity) && city.length < 51 && city.length > 1, "city", city);
    checkValid(postal.match(validRegexPostal), "postal", postal);
});

const form = document.getElementById('form');
submitButton.addEventListener("click", orderInfo);

//Från G-delen, behövs ej nu då vi ej lagrar ebart en produkt i sessionStorage
/* 
var product = JSON.parse(sessionStorage.getItem("product"));
document.getElementById("productInfo").innerHTML = product.title;
document.getElementById("price").innerHTML = "€ " + product.price.toFixed(2); 
var img = document.createElement("img");
img.src = product.image;
document.querySelector(".productImg").appendChild(img);
img.classList.add("productImg");*/

function orderInfo(e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var mail = document.getElementById("mail").value;
    var phone = document.getElementById("phoneNumber").value;
    var street = document.getElementById("streetAddress").value;
    var postal = document.getElementById("postal").value;
    var city = document.getElementById("city").value;
    
    if(localStorage.getItem("cartStorage").length<3){ //När cartStorage är "tom" är det en tom array [] vars längd är 2, därav måste vi checka av att den är mindre än 3 och ej null
        document.getElementById("form-error").innerHTML = "";
        document.getElementById("form-error").innerHTML += "Please add products to cart"; //Förut var meddelandet "Please add product to cart" när enbart en produkt skulle kunna köpas
    } else if(checkValid(name.match(validRegexName) && 1 < name.length && name.length < 51, "name", name)===true &&
    checkValid(mail.match(validRegexMail) && mail.length < 51, "mail", mail)===true &&
    checkValid(phone.match(validRegexPhone) && phone.length < 51, "phoneNumber", phone)===true &&
    checkValid(street.match(validRegexStreet) && street.length < 51 && street.length > 3, "streetAddress", street)===true &&
    checkValid(city.match(validRegexCity) && city.length < 51 && city.length > 1, "city", city)===true &&
    checkValid(postal.match(validRegexPostal), "postal", postal)===true) {
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('mail', mail);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('street', street);
        sessionStorage.setItem('postal', postal);
        sessionStorage.setItem('city', city);
        sendToOrdered();
    } else {
        document.getElementById("form-error").innerHTML = "";
        document.getElementById("form-error").innerHTML += "Please fill out all fields with correct information";
    }
}

