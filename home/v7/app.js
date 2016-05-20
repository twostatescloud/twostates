var app = angular.module("osApp", []);
app.controller("buttonController", function ($scope) {
  //Link and Icon Dictionaries.
    var icons = {
        "windows": "fa-windows",
        "osx": "fa-apple",
        "linux": "fa-linux",
        "ios": "fa-apple",
        "android": "fa-android"
    };
  //Explosion then pop thestack split
    var links = {
      "windows": "/ch/devices/windows/tv",
        "osx": "/ch/devices/mac/tv",
        "linux": "/ch/devices/linux/tv",
        "ios": "/ch/m/tv",
        "android": "/ch/m/tv",
    };
  
    var os = curOS();
    $scope.icon = icons[os];
    $scope.link = links[os];

    function curOS() {
        var s;
        switch (navigator.platform) {
        case "Android":
        case "Linux armv7l":
            s = "android";
            break;
        case "Macintosh":
            s = "osx";
            break;
        case "iPhone":
        case "iPod":
        case "iPad":
            s = "ios";
            break;
        case "Linux":
            s = "linux";
            break;
        default:
            s = "windows";
            break;
        }
        return s;
    }
});
$(document).ready(function(){

	  var scroll = false;
	  var launcherMaxHeight = 420;
	  var launcherMinHeight = 420;
	  
	  // Mousewheel event handler to detect whether user has scrolled over the container
	  $('.apps').bind('mousewheel', function(e){
			if(e.originalEvent.wheelDelta /120 > 0) {
			  // Scrolling up
			}
			else{
				// Scrolling down
				if(!scroll){
					$(".second-set").show();
					$('.apps').css({height: launcherMinHeight}).addClass('overflow');
					scroll =true; 
					$(this).scrollTop(e.originalEvent.wheelDelta);
				}
			}
		});
	  
	  // Scroll event to detect that scrollbar reached top of the container
	  $('.apps').scroll(function(){
		var pos=$(this).scrollTop();
		if(pos == 0){
			scroll =false;
			$('.apps').css({height: launcherMaxHeight}).removeClass('overflow');
			$(".second-set").hide();
		}
	  });
	  
	  // Click event handler to show more apps
	  $('.apps .more').click(function(){
		$(".second-set").show();
		$(".apps").animate({ scrollTop: $('.apps')[0].scrollHeight}).css({height: 420}).addClass('overflow');
	  });
	  
	  // Click event handler to toggle dropdown
	  $(".startbutton").click(function(event){
		event.stopPropagation();
		$(".app-launcher").toggle();
	  });
	  
	  $(document).click(function() {
		//Hide the launcher if visible
		$('.app-launcher').hide();
		});
  
		// Prevent hiding on click inside app launcher
		$('.app-launcher').click(function(event){
			event.stopPropagation();
		});
  
});

// Resize event handler to maintain the max-height of the app launcher
$(window).resize(function(){
		$('.apps').css({maxHeight: $(window).height() - $('.apps').offset().top});
});


var time = new Date();
var h = time.getHours();
if (h > 12) {
    h -= 12;
} else if (h === 0) {
  h = 12;
}
var m = time.getMinutes();
if (m < 10){ m = "0" + m;  }

$("time").text(h + ":" + m);
