function display(evt, element) {
    var content = document.getElementsByClassName("content");
    for (var i = 0; i < content.length; i++) {
      content[i].style.display = "none";
    }

    var links = document.getElementsByClassName("links");
    for (i = 0; i < links.length; i++) {
      links[i].className = links[i].className.replace(" active", "");
    }

    document.getElementById(element).style.display = "block";

    if (evt != null) {
        evt.currentTarget.className += " active";
    }
    else {
        document.getElementById("defaultLink").className += " active";
    }
}

function accordion(accordionID) {
  var accordionArr = document.getElementsByClassName(accordionID);

  for (var i = 0; i < accordionArr.length; i++) {
    accordionArr[i].addEventListener("click", 
      function() {
      this.classList.toggle("active");
      var elem = this.nextElementSibling;
      if (elem.style.display === "block") {
        elem.style.display = "none";
      } else {
        elem.style.display = "block";
      }}
    );
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
    accordion("accordion");
    display(null, 'Header_Information');
});
