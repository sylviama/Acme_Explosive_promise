var category=[];
var types=[];
var products=[];
var output=document.getElementById("output");
var string="";

var promise = new Promise(function(resolve, reject){
  resolve();
  });


function loadCategory(cateId){
  $.ajax({
    url:"category.json"
  }).done(function(data){
    category = data;
    loadTypes(cateId);
  })
}

function loadTypes(cateId){
  $.ajax({
    url:"types.json"
  }).done(function(data){
    types= data;
    loadProducts(cateId);
    // console.log(category);
  });
};

function loadProducts(cateId){
  $.ajax({
    url: "products.json"
  }).done(function(data){
    products= data;
    loopThrough(cateId);

    
  })
};

function loopThrough(cateId){
  
  //what products to loop through:
  var cateArray=[];
  var productIdArray=[];

  //determine what types to loop through based on category
  $(types.types).each(function(a, eleTypes){
    if(eleTypes.category===cateId){
      cateArray.push(eleTypes.id);
    };
  });
  console.log(cateArray);

  //determine which products to loop through based on type
  $(products.products).each(function(b,eleProducts){
    $(cateArray).each(function(c,eleCateArray){
      if(eleProducts.type===eleCateArray){
        productIdArray.push(eleProducts.id);
      };
    });
  });
  console.log(productIdArray);

  //loop through
  string+="<div class='container'><div class='row'>";

  $(products.products).each(function(i, elementProduct){
    $(productIdArray).each(function(j,elementIdArray){
      if(elementIdArray===elementProduct.id){

        //!!!!need to figure out if use jquery how to write, append is appending the whole tag, not parially
        string+= "<div class='col-md-4'><h4>"+elementProduct.name+"</h4>";
        
        //record the looped product's type
        var recordType = elementProduct.type;
        $(types.types).each(function(i,elementTypes){
          if(elementTypes.id===recordType){
            string+= "<p>Type: "+elementTypes.name+"</p>";

            //record the looped type's category
            var recordCategory=elementTypes.category;
            $(category.categories).each(function(k,elementCategory){
              if(elementCategory.id===recordCategory){
                string+= "<p>Category: "+elementCategory.name+"</p></div>";
              }
            })
          }
        })
      }
    })
  })
  string+= "</div></div>";
  output.innerHTML = string;
}

//clear DOM
//!!!!clear function suddently doesn't work!!!
function clear(){
  // $("#output").html("");
  // output.text ="";
  output.innerHTML = "";
}

//run
$("#show").click(function(){
  //!!!need to figure out how to use jquery for selected!!!
  if(document.getElementById("fireworks").selected===true){
    clear();
    promise.then(loadCategory(0));
  }else if(document.getElementById("demolition").selected===true){
    clear();
    promise.then(loadCategory(1));
  }
});





