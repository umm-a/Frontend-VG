
function loadContent(){
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products");
  xhr.send();
  xhr.onreadystatechange = function(){
      if(xhr.readyState === 4 && xhr.status === 200){
          const json = JSON.parse(xhr.response);  //parse response to JSON format
         
          renderCards(json)
        }
      }
}

//Vi skapar en funktion som renderar det vi vill från json-objektet
function renderCards(json){

//Array med unika categorier:
const uniqueCategories = [...new Set(json.map(e=>e.category))];


//Skapar upp category-divs 
uniqueCategories.forEach(e=>{
  let category = document.createElement("div");
  category.setAttribute('id',`id_${e}`)
  category.setAttribute('class','category')
  category.innerHTML = `<h2 class="category_header">${e}</h2>`;
  document.getElementById('outer_container').append(category);

  //categories -  skapa upp row-col div och lägg i category:
  let rowCol = document.createElement("div");
  rowCol.setAttribute('id',`rc_${e}`);
  rowCol.setAttribute('class','row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gy-3 gx-3 p-3');
  category.append(rowCol);

  
  //categories -  lägg categories i dropdown-menu
  let dropdownItem = document.createElement("a");
  dropdownItem.className = 'dropdown-item';
  dropdownItem.setAttribute('href',`#id_${e}`);
  dropdownItem.innerHTML = `${e}`;
  document.getElementById('dropdown-menu').append(dropdownItem);


})

json.forEach(e=>{
  //skapa upp col som card ligger i
  let cardCol = document.createElement("div");
  cardCol.setAttribute('class',`col d-flex align-items-stretch`);

  //lägg cardcol i korrekt row-col category:
  document.getElementById(`rc_${e.category}`).append(cardCol);

  //skapa card och lägg i cardcol
  let card = document.createElement("div");
  card.setAttribute('class',`card`);
  cardCol.append(card);

  //skapa image och lägg i card
  let img = document.createElement("img");
  img.className = "card-img-top";
  img.src = `${e.image}`;
  card.append(img);

  //skapa card-body
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);

  //skapa card-title och lägg till card-body
  let cardTitle = document.createElement("h2");
  cardTitle.className = "card-title";
  cardTitle.innerHTML = `${e.title}`;
  cardBody.append(cardTitle);





  //skapa card-text och lägg till card body
  let cardText = document.createElement("div");
  cardText.className = "card-text collapse";
  cardText.innerHTML = `${e.description}`;
  cardBody.append(cardText);

  //skapa card-footer och lägg till card
  let cardFooter = document.createElement("div");
  cardFooter.className = "card-footer p-2";
  card.append(cardFooter);

  //skapa d-flex och lägg till cardFooter
  let dFlex = document.createElement("div");
  dFlex.className = "d-flex justify-content-between align-items-center";
  cardFooter.append(dFlex);

  //skapa pricetag och lägg till d-flex
  let price = document.createElement("h4");
  price.className = "price pt-2";
  price.innerHTML =  `€ ${e.price.toFixed(2)}`;
  dFlex.append(price);

  //skapa button och lägg till d-flex
  let btn = document.createElement("button");
  btn.className = "btn btn-outline-success p-2 addToCartButton";  //lade till addToCartButton för att använda i js /Maria      
  btn.addEventListener("click", function () {
 //sessionStorage.setItem("product", JSON.stringify(e)); //behövs ej nu när jag anropar addProductToCart(e), dett är från G-delen
 //localStorage.clear(); 
 
 let currentProduct = JSON.stringify(e); 
 
 //hämta cart - om den är tom görs en tom array []
let cartStorage = JSON.parse(localStorage.getItem("cartStorage")) || [];

 if(cartStorage.includes(currentProduct)){
         alert("Product already added! Please go to checkout to change the quantity");
        } else {
            //använder mig utav set för att inte få dubbla värden i cart
            let set = new Set(cartStorage); 
            set.add(currentProduct);
            const toArr = Array.from(set);
            localStorage.setItem("cartStorage", JSON.stringify(toArr));
            window.location.href = "cart.html";
    }
  //går över till cart.js och jobbar med de sparade uppgifterna!
 });

 btn.innerHTML = "Add to cart";
 dFlex.append(btn);
  //skapa rating och lägg till cardfooter
  let rating = document.createElement("p");
  rating.className = "rating";
  rating.innerHTML = `Rating: ${e.rating.rate} (${e.rating.count})`;
  cardFooter.append(rating);



///Modal///

  //Skapa modal  https://getbootstrap.com/docs/4.0/components/modal/
  let modal = document.createElement("div");
  modal.className = "modal fade modal-sm";
  modal.setAttribute('id',`modal_${e.id}`);
  modal.setAttribute('tabindex','-1');
  modal.setAttribute('role','dialog');
  modal.setAttribute('aria-labelledby','exampleModalCenterTitle');
  modal.setAttribute('aria-hidden', 'true');
  document.getElementById('outer_container').append(modal);

  //skapa modal-dialog
  let modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog modal-dialog-centered";
  modalDialog.setAttribute('role','document');
  modal.append(modalDialog);

  //skapa modal content
  let modalContent = document.createElement("div");
  modalContent.className = 'modal-content';
  modalDialog.append(modalContent);

  //skapa modalHeader
  let modalHeader = document.createElement("div");
  modalHeader.className = 'modal-header';
  modalContent.append(modalHeader);

  //skapa modal-title
  let modalTitle = document.createElement("h5");
  modalTitle.className = 'modal-title';
  modalTitle.setAttribute('id', 'exampleModalLongTitle');
  modalTitle.innerHTML = `${e.title}`;
  modalHeader.append(modalTitle);

  //skapa modalbody
  let modalBody = document.createElement("div");
  modalBody.className = 'modal-body';
  modalBody.innerHTML = `${e.description}`;
  modalContent.append(modalBody);
 

  //skapa modal-footer
  let modalFooter = document.createElement("div");
  modalFooter.className = 'modal-footer';
  modalContent.append(modalFooter);

  //lägg till close-knapp
  let modalCloseBtn = document.createElement("button");
  modalCloseBtn.setAttribute('type','button');
  modalCloseBtn.setAttribute('class','btn btn-secondary');
  modalCloseBtn.setAttribute('data-bs-dismiss','modal');
  modalCloseBtn.setAttribute('data-bs-target', `#modal_${e.id}`);
  modalCloseBtn.innerHTML = 'Close';
  modalFooter.append(modalCloseBtn);


  /////////
  //skapa link för modal
  let linkModal = document.createElement("a");
  linkModal.className = "linkModal stretched-link";  //blockerar Add to cart knappen, löst med z-index
  linkModal.setAttribute('href', `modal_${e.id}`);
  linkModal.setAttribute('data-bs-toggle', 'modal');
  linkModal.setAttribute('data-bs-target', `#modal_${e.id}`);
  linkModal.innerHTML = "Read more...";
  cardBody.append(linkModal);
 // console.log(linkModal);
})
}

loadContent();