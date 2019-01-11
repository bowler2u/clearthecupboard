
//Require the RapidAPi
const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('default-application_5bcf4edbe4b0d1763ed68ac0', '970515d6-0873-4dda-be7b-872cf1e8f958');

//Establishing Express
var express = require('express');



//Establishing Unirest
var unirest = require('unirest');

//Establishing Js-Cookie
var jscookie = require('js-cookie');

//Creating our App project
var app = express();

//*** Allowing this application read any files we put in the public folder
app.use(express.static('public'));
app.use(express.static('accessfiles'));

//*** Configuring the App to use the body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




//*** Saving Ingredients to the redis-db
app.post('/api/v1/recipe/ingredient/add', function (req, res){
   
    // TO DO : USER PROFILES CAN ADD INGREDIENTS TO THERE CUPBOARD FOR SAVING 
    
});

app.put('/api/v1/recipe/ingredient/remove', function (req, res){
   
    // TO DO : USER PROFILES CAN REMOVE INGREDIENTS TO THERE CUPBOARD FOR SAVING
    
});

//INITIAL RECIPE SEARCH BASED OFF USERS INGREDIENTS
app.post('/api/v1/recipe/search', function(req, res){
    
    var ingredients = req.body.value;
    var mealtype = req.body.value2;
    var diettype = req.body.value3;
    
    if(mealtype == undefined){
        mealtype = "";
    }
    
    if(diettype == undefined ){
        diettype = "";
    }
    
    console.log("Meal Type: " + mealtype);
    console.log("Ingredients: " + ingredients);
    console.log("Diet: " + diettype);
    var retId = [];
    var retTitle = [];
    var retImg =[];
    var usedIng=[];
    var unusedIng=[];
    var recipe = {};
    
            unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?includeIngredients=" + ingredients + "&ranking=1&limitLicense=false&offset=0&number=6&instructionsRequired=true&type=" + mealtype + "&diet=" + diettype)
                .header("X-RapidAPI-Key", "JYQS4ioQ5GmshUk48NUPn3HYYuXMp1d0uDWjsnqstvbauYHXyo")
                .end(function (result) {      
        
        //console.log(result.body.results);
        var data = result.body.results;
        console.log(data);
        if( data == ""){
            console.log('empty Search body');
            return;
        }
        
            for(var i=0; i<data.length; i++){
                retId.push(data[i].id);
                retTitle.push(data[i].title);
                retImg.push(data[i].image);
                usedIng.push(data[i].usedIngredientCount);
                unusedIng.push(data[i].missedIngredientCount);
            }
        
            recipe.id = retId;
            recipe.title = retTitle;
            recipe.img = retImg;
            recipe.Ing_used = usedIng;
            recipe.Ing_un_used = unusedIng;
            res.send(recipe);
            console.log(recipe);     
    });
  
});
 
//SAVING THE SELECTED RECIPE ID TO REDIS SO THE RECIPE PAGE LOADS SELECTED INFO
//TO DO: SAVE THE VALUE TO A COOKIE SO REDIS ISN'T REQUIRED
//***********************************************
app.post('/api/v1/recipe/select', function(req, res){
    var id = req.body.value;
    var idnum = parseInt(id, 10);
    var key = "recipeID";
    console.log(id);
    // TO DO : Use this ID to Search for Title, Img, Instructional Steps on on recipe. Other information bits as well
    client.set(key, id);
})
    
//GETTING RECIPE DATA BASED OFF SAVED RECIPE ID FROM REDIS
//TO DO: REPLACE THE SAVED ID FROM REDIS TO AN ID SAVED IN THE COOKIE TO SO REDIS ISN'T REQUIRED
//***********************************************
app.post('/api/v1/recipe/main', function(req, res){
    
        var recId = req.body.value;
        
        console.log("Id passed: " + recId);
        
        //res.sendFile('../public/recipe.html');
        
        unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"+ recId +"/information")
            .header("X-Mashape-Key", "JYQS4ioQ5GmshUk48NUPn3HYYuXMp1d0uDWjsnqstvbauYHXyo")
            .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
            .end(function (result) {
            res.send(result.body);
            console.log("API Call Made");
            });
    
    
    
});

//Setting up our App port Listener
console.log('Listening on Port 8081');
//var port = normalizePort(process.env.PORT || '8081');
app.listen(8081);