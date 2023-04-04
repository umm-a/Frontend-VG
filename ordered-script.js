//VG-delen
let arrayOfProducts = JSON.parse(localStorage.getItem("cartStorage")) || [];
var i = 0;
    arrayOfProducts.forEach(element => {
        var div = document.createElement("div");
        var currentElement = JSON.parse(element);
        var productImg = document.createElement("img");
        productImg.src = currentElement.image;
        productImg.classList.add("width-20");
        div.append(productImg);
        var productInfo = document.createElement("p");
        productInfo.innerHTML = currentElement.title;
        productInfo.classList.add("p-normal");
        div.append(productInfo);
        var productPrice = document.createElement("p");
        productPrice = "€ " + currentElement.price.toFixed(2) + " each";
        var productPriceTotal = document.createElement("p");
        productPriceTotal.classList.add("p-normal");
        var quantity = document.createElement("p");
        quantity.classList.add("p-normal");
        var receiptPrices = JSON.parse(sessionStorage.getItem("receiptOfProducts"));
        productPriceTotal.innerHTML = "€ " + receiptPrices[i].totalPrice + " total";
        quantity.innerHTML = receiptPrices[i].quantity + " products";
        div.append(productPrice);
        div.append(quantity);
        div.append(productPriceTotal)
        var hr = document.createElement("hr");
        div.append(hr);
        document.getElementById("list-of-products").append(div);
        i++; //körde en klassisk i++ för att nå alla elementen (cartStorage och receiptOfProducts håller samma antal produkter...)
    });

    var totalPrice = JSON.parse(sessionStorage.getItem("total"));
    document.getElementById("total-sum").innerHTML += totalPrice + " total";
    document.getElementById("phoneMailMsg").innerHTML = "If we need to reach out to you, we will either reach you on number " + sessionStorage.getItem("phone") + " or mail " + sessionStorage.getItem("mail");
    document.getElementById("fullName").innerHTML = sessionStorage.getItem("name");
    document.getElementById("theAddress").innerHTML = sessionStorage.getItem("street") + "<br> " + sessionStorage.getItem("postal") + "<br> " + sessionStorage.getItem("city");


//Från G-delen, ej relevant
/*
var product = JSON.parse(sessionStorage.getItem("product"));
document.getElementById("productInfo").innerHTML = product.title;
document.getElementById("price").innerHTML = "€ " + product.price.toFixed(2); 
//document.getElementById("productImage").src = product.image;
//document.getElementById("orderedPage").append(product.image);
document.getElementById("phoneMailMsg").innerHTML = "If we need to reach out to you, we will either reach you on number " + sessionStorage.getItem("phone") + " or mail " + sessionStorage.getItem("mail");
document.getElementById("fullName").innerHTML = sessionStorage.getItem("name");
document.getElementById("theAddress").innerHTML = sessionStorage.getItem("street") + "<br> " + sessionStorage.getItem("postal") + "<br> " + sessionStorage.getItem("city");
var img = document.createElement("img");
img.src = product.image;
img.classList.add("productImg");
document.querySelector(".productImg").append(img); */

function clearSession(){
    sessionStorage.clear();
    localStorage.clear();
   // sessionStorage.removeItem("product"); Från G-delen
}