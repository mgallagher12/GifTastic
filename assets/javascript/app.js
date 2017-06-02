//Global Variables
//Initial Array of College Football Teams
var teamArr = ["florida state", "alabama", "clemson", "auburn", "usc", "ohio state", "michigan", "florida", "texas", "notre dame"];
//Helper Functions
//renderButtons will display the teams for all teams within the teamArr
function renderButtons() {

	//Empty the buttons panel before redrawing
	$("#buttonPanel").empty();

	//Loop thorugh the array of teams
	for (var i = 0; i < teamArr.length; i++) {

		//Dynamically generate a button for each team in the array
		var button = $("<button>");
		button.addClass("teamButton");
		button.attr("data-team", teamArr[i]);
		button.text(teamArr[i]);

		//Add the button to HTML
		$("#buttonPanel").append(button);
	}
}

//Event Handlers
//An event handler for the User form to add additional teams to the array
$("#add-team").on("click", function(event) {
	event.preventDefault();

	//Get the input from the textbox
	var team = $("#team-input").val().trim();

	//The team from the textbox is then added to the array
	teamArr.push(team);
	$("#team-input").val("");

	//Redraw the team buttons
	renderButtons();
});

//fetchTeamGifs will fetch the team Gifs with the Giphy API
function fetchTeamGifs() {

	//Get the team name from the button clicked
	var teamName = $(this).attr("data-team");
	var teamStr = teamName.split(" ").join("+");

	//Construct the Giphy URL
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + teamStr + " football" +
                 "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";

	//Make the AJAX call to the Giphy API
	$.ajax({
		method: "GET",
		url: queryURL,
	})
	.done(function(result) {
		//Get the results array
		var dataArray = result.data;

		//Create and display the div elements for each of the returned GIFs
		$("#gifPanel").empty();
		for (var i = 0; i < dataArray.length; i++) {
			var newDiv = $("<div>");
			newDiv.addClass("teamGif");
			

			var newImg = $("<img>");
			newImg.attr("src", dataArray[i].images.fixed_height_still.url);
			newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
			newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
			newImg.attr("data-state", "still");
			newDiv.append(newImg);

			//Append the new GIFs to the gifPanel
			$("#gifPanel").append(newDiv);
		}
	});
}

//animateTeamGif will animate a still GIF and stop a moving GIF
function animateTeamGif() {
	//The image state will be either still or animated
	var state = $(this).find("img").attr("data-state");

	//Make the GIF either animated or still depending on the data-state value
	if (state === "still") {
		$(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
		$(this).find("img").attr("data-state", "still");
	} else {
		$(this).find("img").attr("src", $(this).find("img").attr("data-still"));
		$(this).find("img").attr("data-state", "still");
	}
}

//Render the inital team buttons when the HTML is done loading
$(document).ready(function() {
	renderButtons();
});

//An event handler for the team buttons to fetch appropriate GIFs
$(document).on("click", ".teamButton", fetchTeamGifs);

//An event handler for the team GIFs to make the image animate and stop
$(document).on("click", ".teamGif", animateTeamGif);




















