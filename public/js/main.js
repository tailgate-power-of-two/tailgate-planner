function showHide() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

//   $('a').click(function(){
//     $('img').animate({
//         width: 200,
//         height: 150,
//         top: 0,
//         marginTop: '75px', // heigth / 2
//         marginLeft: '100px' // width / 2
//     });
// });