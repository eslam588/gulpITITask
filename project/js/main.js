let map;

function initMap(location) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 12,
  });
  const marker = new google.maps.Marker({
      position: location,
      map: map,
  })
}

window.initMap = initMap;

navigator.geolocation.getCurrentPosition(function(pos){
    initMap({lat: pos.coords.latitude , lng: pos.coords.longitude});
    console.log("Latitude", pos.coords.latitude);
    console.log("Longitude",pos.coords.longitude);
    });



let model= document.getElementById("openmodel");
const myInput = document.getElementById('myInput');

model.addEventListener('shown.bs.modal', () => {

  myInput.focus()
})


const toggledbtn = document.getElementById("toggle-btn");
const toggledul = document.getElementById("toggler-ul");

const toggledallul = document.querySelectorAll("header ul li a");

toggledallul.forEach(ele => {
  ele.addEventListener("click",function(){
    toggledul.style.top= "-500px"
  })
})


function mytoggler() {

  if (toggledul.style.top=="48px") {
    toggledul.style.top= "-500px"
  } else {
    toggledul.style.top="48px";

  }
  
}



$('[data-target="#myModal"]').on('click', function (e) {
  e.preventDefault();

  var _linky = $(this).attr('href');
  var _target = $(this).data('target'); 
  var $target = $(_target);

  if ($target.length > 0) {
    
      $target.find('iframe').attr('src', 'about:blank');

      var _isRemote = false;
      if (_linky.indexOf('http') > -1) {
          _isRemote = true;
      }

      if (!_isRemote) {
          if (_linky.indexOf('?') > -1) {
              _linky += '&tmpl=component';
          } else {
              _linky += '?tmpl=component';
          }
      }
    
      $target.find('iframe').attr('src', _linky).load(function() {
          $target.modal('show');
      });
  }
});

$('body').on('hidden.bs.modal', '.modal', function () {
  $(this).removeData('bs.modal');
});


