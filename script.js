const Products = [
  {name: "shoes"},
  {name: "football"},
  {name: "stocks"},
  {name: "short"},
  {name: "glasses"},
  {name: "hats"}
];
let len = Products.length;
var category = Products.map((product, index) => ({id: index, ...product, price: 10, quality: 10, discount: 0.1}));
var fullProduct = category.map(product => ({...product}));
var selectedProduct =  [];
var htmlCheckout = document.getElementById("state");
function filterList(){
  console.log(selectedProduct);
  let filterProduct;
  let val = document.getElementById("myInput").value;
  if(val == '') { 
    selectedProduct = category.map(product => ({...product}));
    fullProduct = category.map(product => ({...product}));
  } else {
    filterProduct = category.filter(fil =>{
      return fil.name.toLowerCase().includes(val.toLowerCase())
    });  
    fullProduct = filterProduct.map(product => ({...product}));
    selectedProduct = filterProduct.map(product => ({...product}));
    console.log(fullProduct);
  }  
  htmlCheckout.innerHTML = `Total amount: 0 $`;
  render(selectedProduct);  
  return selectedProduct;                     
}
filterList();

function addItem(id) {            
  id = parseInt(event.target.dataset.value);   
  if(selectedProduct[id].quality <= 0) {
    return 0;
  } else {
    selectedProduct[id].quality -= 1; 
    render(selectedProduct);
  }     
  console.log(selectedProduct[id].quality);
}

function subItem(id) {   
  id = parseInt(event.target.dataset.value);       
  if(selectedProduct[id].quality >= fullProduct[id].quality) {
    return 0;
  } else {
    selectedProduct[id].quality += 1;  
    render(selectedProduct);
  }      
  console.log(selectedProduct[id].quality);
} 

function checkout() {  
  function appendObjTo(array, newObj) {
    const frozenObj = Object.freeze(newObj);
    return Object.freeze(array.concat(frozenObj));
  }
  var total = 0;
  let discount = 0, nodiscount = 0;
  var checkoutProduct = [];
  console.log(selectedProduct);
  for (let i = 0; i < selectedProduct.length; i++) {
    checkoutProduct = appendObjTo(checkoutProduct, {name: `${selectedProduct[i].name}`, 
      quality: (parseInt(fullProduct[i].quality) - parseInt(selectedProduct[i].quality)),
      price: parseInt(selectedProduct[i].price),
      discount: selectedProduct[i].discount
    });
  };  
  console.log(checkoutProduct);
  for (let j = 0; j < checkoutProduct.length; j++) {
    if (checkoutProduct[j].quality >= 5) {
      discount = checkoutProduct[j].quality * checkoutProduct[j].price * (1 - checkoutProduct[j].discount)
    } else {
      nodiscount = checkoutProduct[j].quality*checkoutProduct[j].price
    }
    total = total + discount + nodiscount;
  }
  console.log(total);  
  htmlCheckout.innerHTML = `Total amount: ${total} $`;
}

function render(selectedProduct) {  
  let htmlList = document.getElementById("productList");
  let content = selectedProduct.map(function(item, index) {
    if(fullProduct[index].quality - item.quality < 5) {
      return '<tr><th scope="row">' + (index + 1) + '</th>' + 
      '<td>' + item.name  + '</td>' + 
      '<td>' + item.quality  + '</td>' + 
      '<td>' + item.price  + '</td>' + 
      '<td><button onclick = "addItem()", data-value ="' + index + '">Add</button><span>Selected:' + (fullProduct[index].quality - item.quality) + '</span></td>' +
      '<td><button onClick ="subItem()", data-value ="' + index + '">Subtract</button></td></tr>' ;
    } else {
      return '<tr><th scope="row">' + (index + 1) + '</th>' + 
      '<td>' + item.name  + '</td>' + 
      '<td>' + item.quality  + '</td>' + 
      '<td>' + item.price  + '</td>' + 
      '<td><button onclick = "addItem()", data-value ="' + index + '">Add</button><span>Selected:' + (fullProduct[index].quality - item.quality) + ', Discount 10%</span></td>' +
      '<td><button onClick ="subItem()", data-value ="' + index + '">Subtract</button></td></tr>' ;
    }
  });
  htmlList.innerHTML = content.join(" ");
}  
render(selectedProduct);