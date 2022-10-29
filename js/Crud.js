let nameInput = document.getElementById("productInputName");
let priceInput = document.getElementById("productInputPrice");
let taxesInput = document.getElementById("productInputTaxes");
let discountInput = document.getElementById("productInputPrAds");
let totalInput = document.getElementById("totalInput");
let categoryInput = document.getElementById("productInputCategory");
let discInput = document.getElementById("productInputDes");
let countInput = document.getElementById("productInputCount");

let addBtn = document.getElementById("addProduct");
let clearBtn = document.getElementById("clearForm");
let updateProduct = document.getElementById("updateProduct");
let deleteAll = document.getElementById("delete-all")
let countProductStar = document.getElementById("count-product");
let CountStar = document.getElementById("Count-star");
let totalSpan = document.getElementById("total-span");


let moodUpdate = "create";
let tmp;


if (localStorage.getItem("product") !== null){

    productData = JSON.parse(localStorage.getItem("product"));
}

else{
     productData = [];
}

//==== Btn create Product ====
addBtn.onclick = function(){

    getTotal(); 
    
    let ProductItem = {

        productName : nameInput.value,
        productPrice: priceInput.value,
        productTaxes : taxesInput.value,
        productAds : discountInput.value,
        productTotal : totalInput.innerHTML,
        productCategory : categoryInput.value,
        productDisc : discInput.value,

    }

    if( nameInput.value !== "" &&  priceInput.value !== "" &&  categoryInput.value !== "" && discInput.value !== ""){


        if(moodUpdate === "create"){

            if( countInput.value > 1){

                for (let i = 0; i < countInput.value; i++) {
                    
                    productData.push(ProductItem);
                }
            }
            else{
    
                productData.push(ProductItem);
            }
        }

        else{
        
            productData[tmp] = ProductItem;

            addBtn.innerHTML = "Add Product";
   
            moodUpdate = "create";

            countInput.style.display = "block"
            countProductStar.style.display = "block"
            CountStar.style.display = "block";
        }
        
        clearInp();
    }

    localStorage.setItem("product", JSON.stringify(productData))

    showData();
}


// ====  Get Total Function ====
function getTotal(){

    if(priceInput.value != ""){

        let total = (+priceInput.value +  +taxesInput.value) -  +discountInput.value ;

        totalSpan.innerHTML = total;


        totalInput.style.backgroundColor = "green"  
    }
    else {

        totalSpan.innerHTML = "";

        totalInput.style.backgroundColor = "#dc3545" 
    }
}


let totalDeleteSpan = document.getElementById("total-delete-span")
// Show Data Function
function showData(){
    getTotal()

    let table = '';

    for (let i = 0; i < productData.length; i++) {

        table += `<tr>
                    <td>${i+1} </td>
                    <td>${productData[i].productName} </td>
                    <td>${productData[i].productPrice}</td>
                    <td>${productData[i].productCategory}</td>
                    <td>${productData[i].productDisc}</td>
                    <td> <button onclick="deleteItem(${i})" class="btn btn-primary" id="btn-delete"> Delete </button> </td>
                    <td> <button onclick="updateBtn(${i})" class="btn btn-primary" id="btn-update"> Update </button> </td>
                </tr> `
    }

    document.getElementById("tbody").innerHTML = table;

    if(productData.length > 0){

        document.getElementById("delete-all").innerHTML = `Total : ${productData.length}`

        deleteAll.style.cssText = "background-Color :#0d6efd; color : #fff;"
    }
    else {
        deleteAll.style.cssText = "background-Color : ; color :;"
    }
  
}
showData();


// clear Inputs
document.getElementById("clearForm").onclick = function(){
        clearInp()
};


// clear Data
function clearInp(){

    nameInput.value = "";
    priceInput.value = '';
    taxesInput.value = "";
    discountInput.value = '';
    totalInput.innerHTML = `Total : `;
    countInput.value = "";
    categoryInput.value = "";
    discInput.value = "";
}


// Delete Item Function
function deleteItem(i){

    productData.splice(i, 1);

    localStorage.product = JSON.stringify(productData)

    showData()

    tmp  = i ;
}


//  Delete All Item Function
document.getElementById("delete-icon").onclick =   function (){
    
    localStorage.clear();

    productData.splice(0);
 
    showData();
}


// Update Btn
function updateBtn(i){

    nameInput.value         = productData[i]. productName;                
    priceInput.value        = productData[i].productPrice ;               
    taxesInput.value        = productData[i].productTaxes ;               
    discountInput.value          = productData[i].productAds;                  
    totalInput.innerHTML    = productData[i].productTotal;                
    categoryInput.value     = productData[i].productCategory;                
    discInput.value         = productData[i].productDisc; 
    
    getTotal();
   countInput.style.display = "none";
   CountStar.style.display = "none";
   countProductStar.style.display = "none"
   addBtn.innerHTML = 'Update Product';
   moodUpdate = "update"
   tmp = i;

   window.scrollTo({
      left : 0,
      top: 0,
      behavior: "smooth",
   })

}


// search Function
function searchData(value){

   let table = '';

    for (let i = 0; i < productData.length; i++) {

        if(productData[i].productName.includes(value)){

            table += `
                     <tr>
                     <td>${i+1} </td>
                     <td>${productData[i].productName} </td>
                     <td>${productData[i].productPrice}</td>
                     <td>${productData[i].productCategory}</td>
                     <td>${productData[i].productDisc}</td>
                     <td> <button onclick="deleteItem(${i})" class="btn btn-primary" id="btn-delete"> Delete </button> </td>
                     <td> <button onclick="updateBtn(${i})" class="btn btn-primary" id="btn-update"> Update </button> </td>
                     </tr>
                  `
        }

    }
   
    document.getElementById("tbody").innerHTML  = table;

}



