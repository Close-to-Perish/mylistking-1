
	
$(function() {
  // SETUP
  var $list, $newItemForm, $newItemButton;
  var item = ""; // item is an empty string
  $list = $("ul"); // Cache the unordered list
  $newItemForm = $("#newItemForm"); // Cache form to add new items
  $newItemButton = $("#newItemButton"); // Cache button to show form

  $("li")
    .hide()
    .each(function(index) {
      // Hide list items
      $(this)
        .delay(450 * index)
        .fadeIn(1600); // Then fade them in
    });

	// ITEM COUNTER
  function updateCount() {
    // Create function to update counter
    var items = $("li[class!=complete]").length; // Number of items in list
    $("#counter").text(items); // Added into counter circle
  }
  updateCount(); // Call the function

  // SETUP FORM FOR NEW ITEMS
  $newItemButton.show(); // Show the button
  $newItemForm.hide(); // Hide the form
  $("#showForm").on("click", function() {
    // When click on add item button
    $newItemButton.hide(); // Hide the button
    $newItemForm.show(); // Show the form
  });

/*#################################################
#9 	My list count wont UPDATE when I add a new item! 
It works when I delete an item! -BC 
#################################################*/

/*#################################################
In your code I found a missing void parentheses
set after the final updateCount function
call down below. - WDP
#################################################*/

  // ADDING A NEW LIST ITEM
  $newItemForm.on("submit", function(e) {
    // When a new item is submitted
    e.preventDefault(); // Prevent form being submitted
    var text = $("input:text").val(); // Get value of text input	
    var lowerText = text.toLowerCase(); // Make values lower case
    var favClass = "favorite";         //adds in the favorite class to all newItems

/*##########################################
Begin logic for traversing the existing
list to search for duplicate items. -WDP
###########################################*/

    var i;
    var duplicate = false;
    var blank = false;
    const listItems = document.querySelectorAll(".list li"); //selector for list items

    for(i = 0; i < listItems.length; i++) 
    {
      //console.log("for loop is running");
      //logic for checking duplicates
      if(listItems[i].textContent === lowerText)
      {
        duplicate = true;
        console.log("we assessed a true duplicate.");
      }
    }
      //logic for checking blanks
    if(!lowerText) {
      blank = true;
      console.log("blank detected!")
    }
    
    if(duplicate != true && blank != true) {
      $list.append("<li class='" + favClass + "'>" + lowerText + "</li>"); // Add item to end of the list
      $("input:text").val(""); // Empty the text input
      updateCount(); // Update the count
      duplicate = false;
    }else if(blank){
      alert("A blank is not a list item!")  //alert for blanks
      $("input:text").val(""); // Empty the text input
      updateCount();  //update the count
    } else {
      alert("No duplicate items allowed!")  //alert for duplicates
      $("input:text").val(""); // Empty the text input
      updateCount();  //update the count
    }
	
		
  });
	
/*#################################################
#10* 	Okay, this one is not just a fix of something I 
messed up :(  The client wanted a feature & I just 
didn't get to it yet. I know you can make it work 
for me. 
FEATURE: "A list user wants every new item to default
as a favorite (have the css class favorite with 
a heart icon)"
	okay - Hard code it in with the string
	better - use css selector to pick the new list item &
			add with a method call. 
			(hint: don't change exisiting code, add new code)
	best - don't hardcode in the class name, make it a variable.
-BC 
#################################################*/	

/*###############################################
Check the altered code above your comment to see
the changes made to create new list items with
a favorite class. -WDP
################################################*/

	
/*#################################################
#11* LAST ONE! This is another feature I didn't code yet!
I know...I'm sorry. You are the best for helping. I will
buy you coffee for a month! 

FEATURE: "A list user wants to prevent duplicate items from
being added to the list so they don't buy them twice." 

	okay - add comments to lay out your logic to solve this. 
	better - add in at least SOME of the code to execute your plan
	best - get it working! let the user know it was already on the list
	super - don't let the user add an empty list item (return keyword?)
		and, better do a check to make sure they can't just add a duplicate
		but with different capitalization. Don't let them add "honey" "Honey"
		"HONEY" (treat those as all the same)
-BC 
#################################################*/		
	
/*###############################################
In the above code there is now a combination of
both for loop and if-else statement to check
for duplicates and blanks. Depending on the 
user's input, a window alert pops up to let the
user known they have entered an invalid list
item, and will clear the input field. -WDP
################################################*/
	
	
  // CLICK HANDLING - USES DELEGATION ON <ul> ELEMENT
  $list.on("click", "li", function() {
    var $this = $(this); // Cache the element in a jQuery object
    var complete = $this.hasClass("complete"); // Is item complete

    if (complete === true) {
      // Check if item is complete
      $this.animate(
        {
          // If so, animate opacity + padding
          opacity: 0.0,
          paddingLeft: "+=180"
        },
        500,
        "swing",
        function() {
          // Use callback when animation completes
          $this.remove(); // Then completely remove this item
        }
      );
    } else {
      // Otherwise indicate it is complete
      item = $this.text(); // Get the text from the list item
      $this.remove(); // Remove the list item
      $list // Add back to end of list as complete
        .append('<li class="complete">' + item + "</li>")
        .hide()
        .fadeIn(300); // Hide it so it can be faded in
      updateCount(); // Update the counter
    } // End of else option
  }); // End of event handler
});
