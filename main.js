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
  $("#output").append("<div class='container'><div class='row'></div></div>");

  $(products.products).each(function(i, elementProduct){
    $(productIdArray).each(function(j,elementIdArray){
      if(elementIdArray===elementProduct.id){

        $(".row").append("<div class='col-md-4' id='"+elementProduct.id+"'><h4>"+elementProduct.name+"</h4></div>");
        
        //record the looped product's type
        var recordType = elementProduct.type;
        $(types.types).each(function(i,elementTypes){
          if(elementTypes.id===recordType){
            $("#"+elementProduct.id).append("<p>Type: "+elementTypes.name+"</p>");

            //record the looped type's category
            var recordCategory=elementTypes.category;
            $(category.categories).each(function(k,elementCategory){
              if(elementCategory.id===recordCategory){
                $("#"+elementProduct.id).append("<p>Category: "+elementCategory.name+"</p>");
              };
            });
          };
        });
      };
    });
  });
};

//clear DOM
function clear(){
  $("#output").html("");
}

//run
$("#show").click(function(){
  if($("#fireworks").is(":selected")){
    clear();
    promise.then(loadCategory(0));
  }else if($("#demolition").is(":selected")){
    clear();
    promise.then(loadCategory(1));
  }
});





