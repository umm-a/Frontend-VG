let list = document.querySelector("#list");

layProductsInCart();

//Hämtar cartStorage och lägger ut elementen i varukorgen
function layProductsInCart() {
    let arrayOfProducts = JSON.parse(localStorage.getItem("cartStorage")) || [];
    arrayOfProducts.forEach(element => {
        let currentElement = JSON.parse(element);
        //Lägger style för vardera element!
        layStyleOfProduct(currentElement);
    });
}

//Här kommer stylingen, där ID/klasser läggs till för identifiering...
function layStyleOfProduct(product){
    var div = document.createElement("div");
    div.classList.add("pb-20");
    let idOfElement = "id-" + JSON.stringify(product.id);
    div.setAttribute("id", idOfElement);
    var img = document.createElement("img");
    img.src = product.image;
    img.width = "100";
    img.height = "100";
    div.append(img);
    var titleSpan = document.createElement("span");
    titleSpan.innerHTML = product.title;
    div.append(titleSpan);
    
    var floatRightSpan = document.createElement("span");
    floatRightSpan.classList.add("float-right");
    var priceOfSameProducts = document.createElement("span");
    var priceOfProduct = document.createElement("span");
    priceOfProduct.classList.add("price-per-product");
    priceOfProduct.innerHTML = product.price;
    priceOfSameProducts.innerHTML = "€ ";
    priceOfSameProducts.classList.add("price-span");
    priceOfSameProducts.append(priceOfProduct);
    var paragraph = document.createElement("p");
    var priceOfProductTotal = product.price;
    var poptSpan = document.createElement("span");
    poptSpan.append(priceOfProductTotal);
    //Denna används för att slå ihop priset av vardera produkt * kvantitet
    poptSpan.classList.add("price-of-product-total"); 
    paragraph.innerHTML += "€ "
    paragraph.append(poptSpan);
    priceOfSameProducts.append(paragraph);
    paragraph.classList.add("paragraph");
    paragraph.innerHTML += " total/product type";
    floatRightSpan.append(priceOfSameProducts);
    var inputQuantity = document.createElement("input");
    inputQuantity.value = "1";
    inputQuantity.type = "number";
    inputQuantity.classList.add("cart-quantity");
    floatRightSpan.append(inputQuantity);
            var removeBtn = document.createElement("btn");
            removeBtn.classList.add("btn");
            removeBtn.classList.add("btn-danger");
            removeBtn.innerHTML = "REMOVE";
            floatRightSpan.append(removeBtn);
            
            div.append(floatRightSpan);
            div.classList.add("cart-item");
            
            document.getElementById("cartProducts").append(div);
            
            //Knappen som tar bort produkter av ett visst slag
            removeBtn.addEventListener("click", e => {
                console.log(product.id);
                let arrayOfProducts = JSON.parse(localStorage.getItem("cartStorage")) || [];
                arrayOfProducts.forEach(thing => {
                    if(JSON.parse(thing).id === product.id){ //thing.id är undefined behövde parse!
                        arrayOfProducts.pop(thing);
                        removeBtn.parentElement.parentElement.remove();
                        //Måste uppdatera totalpriset när en produkt tas bort
                        updateAllTotal();
                    } else {
                    }
                });
                localStorage.setItem("cartStorage", JSON.stringify(arrayOfProducts));
                
            });
        }
        updateAllTotal();

        var quantityInputs = document.getElementsByClassName('cart-quantity');
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener('change', quantityChanged); //När vi ändrar kvantitet vill vi få respons... vi kallar på en metod som i sin tur kollar av värdet av input, samt uppdaterar varukorgens priser
        }

        function quantityChanged(event) {
            var input = event.target;
            if (isNaN(input.value) || input.value <= 0) { //isNaN = is Not a Number, då vill vi ändra quantity-fältet till 1, eller om användaren anger ett negativt värde... vi vill ej ge pengar till kund!
                input.value = 1
            }
            updateAllTotal();
        }


        function updateAllTotal() {
            var cartItems = document.getElementsByClassName('cart-item');
            var priceTotal = 0;
            sessionStorage.removeItem("receiptOfProducts");
            //Skapar kvitto för att lägga ut produkter på sistasidan
            let arrayOfReceipt = JSON.parse(sessionStorage.getItem("receiptOfProducts")) || [];
            for (var i = 0; i < cartItems.length; i++) {
                var eachCartItem = cartItems[i];
                var pricePerItem = eachCartItem.getElementsByClassName("price-per-product")[0];
                var quantityPerProduct = parseFloat(eachCartItem.getElementsByClassName("cart-quantity")[0].value);
                //Vi lägger nedan ihop totalpriset för alla produkter av samma slag
                document.getElementsByClassName("price-of-product-total")[i].innerHTML = parseFloat(pricePerItem.innerHTML) * quantityPerProduct;
                //Totalpriset blir såklart tidigare totalpris + vardera produkt * kvantiteten av produkten
                priceTotal = priceTotal + (parseFloat(pricePerItem.innerHTML * quantityPerProduct));

                //Skickar så att det går att skriva ut totalpriset på bekräftelsesidan
                var product = {
                    "quantity": quantityPerProduct,
                    "totalPrice": parseFloat(pricePerItem.innerHTML * quantityPerProduct),
                };
                arrayOfReceipt.push(product);
            }
            sessionStorage.setItem("receiptOfProducts", JSON.stringify(arrayOfReceipt));
            //Totalpriset skickas med i en egen sessionStorage
            sessionStorage.setItem("total", Math.round(priceTotal * 100) / 100);
            document.getElementById("total-price").innerHTML = "Total: € " + Math.round(priceTotal * 100) / 100; //Math.round(x * 100) / 100 ger två decimalers avrundning - lagom
        }