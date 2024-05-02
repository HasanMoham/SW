const nav = document.querySelector(".navb"),
  searchIcon = document.querySelector("#searchIcon");
//   navOpenBtn = document.querySelector(".navOpenBtn"),
//   navCloseBtn = document.querySelector(".navCloseBtn");
searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});

document.addEventListener("DOMContentLoaded", function() {
  // Get all the card elements
  var cards = document.querySelectorAll(".card.split");
  
  // Add click event listeners to each card
  cards.forEach(function(card) {
      card.addEventListener("click", function() {
          // Get the URL from the data-url attribute of the clicked card
          var url = card.getAttribute("data-url");
          
          // Navigate to the specified URL
          window.location.href = url;
      });
  });
});
