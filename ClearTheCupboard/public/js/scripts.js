$(document).ready(function () {
  // Activate WOW.js
  new WOW().init();
});

$(window).ready(function() {
  // Splash Screen
  $("#splash").fadeOut();
});


//**************** INDEX JQUERY ***********************
//*****************************************************
 $(document).ready(function() {
     
        $(".titleContainer").css("display", "block");
             
             $(window).scroll( function(){
                 
                 $('.stepzli').each( function(i){
                    
                    var bottom_of_object = $(this).offset().top;
                    var bottom_of_window = $(window).scrollTop() + $(window).height();
                    if( bottom_of_window > bottom_of_object ){

                        $(this).animate({'opacity':'1'},2000);

                    } 
                 });
                    
                $('.cardrecipes').each( function(i){

                var bottom_of_object = $(this).offset().top;
                var bottom_of_window = $(window).scrollTop() + $(window).height();


                /* If the object is completely visible in the window, fade it it */
                if( bottom_of_window > bottom_of_object ){

                    $(this).animate({'opacity':'1'},1500);

                }

                  }); 
          });
             
             
             //ADD A BORDER HIGHLIGHT TO SELECTED SEARCH PARAMETERS
             $(".typeBtn").click(function(){
                 console.log("btn toggled");
                 this.classList.toggle("btnSelected");   
             });
             
            
         
             //Adding a delay so we can see the functionality of the loader while request processes
             $("#load_me_baby").on("click", function(e) {
                 e.preventDefault();
         
                 $("#loadMe").modal({
                     backdrop: "static", //remove ability to close modal with click
                     keyboard: false, //remove option to close with keyboard
                     show: true //Display loader!
                 });
                 setTimeout(function(){
                     $("#loadMe").modal("hide");
                     //window.scrollTo(0, 1000);
                 }, 3500);
             });
         });
          
          
         
         function showRecipes(){
             console.log('show recipes function');
                $( ".cardrecipes" ).css( "display", "block" );
                //$(".cardrecipes").animate({ opacity: 1 }, 700);
         }
         
         //Bind Enter Key to Add Ingredient Button
         $(document).keypress(function(e) {
             if (e.which == 13) {
                 $("#addIngredient").click();
             }
         });
//*****************************************************

//**************** INDEX ANGULAR ***********************
//*****************************************************
