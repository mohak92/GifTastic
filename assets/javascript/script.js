// Initial array of animals
var animals = ["lion", "dog", "rat", "parrot"];

// displayAnimalGifs function re-renders the HTML to display the appropriate content
function displayAnimalGifs() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=pXlJ33V00jzMoivfHSKXbUaPou6bOhPp&limit=10";

    // Creates AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(results);

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            gifDiv.addClass("col-md-3, col-lg-3")
            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.addClass("gif");
            animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state", "animate");

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $("#gifs-appear-here").prepend(gifDiv);
        }
    });

}

// Function for adding new animal buttons
function renderButtons() {

    // Deletes the animals prior to adding new animals
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generates buttons for each animal in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of animal to our button
        a.addClass("animal");
        // Added a data-attribute
        a.attr("data-name", animals[i]);
        // Provided the initial button text
        a.text(animals[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the submit button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var animal = $("#animal-input").val().trim().toLowerCase();
    if (animal.length !== 0 && !animals.includes(animal)) {
        // The animal from the textbox is then added to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our animals array
        renderButtons();
    }
});

// Adding click event listeners to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalGifs);

$(document).on("click", ".gif", function() {
    console.log("Gif Clicked!");
    var state = $(this).attr("data-state");
    console.log(state);
    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else if (state == "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Calling the renderButtons function to display the intial buttons
renderButtons();
displayAnimalGifs();