//defining counter
var widgetCounter = 0;

//defining already exist
var wExist = new Array();
wExist["analClock"] = 0;
wExist["digiClock"] = 0;
wExist["calendar"] = 0;
wExist["weather"] = 0;

//function to add widget in widget area
function addWidget(){

	//getting value of selected widget
	var selectedWidget = $("#widgetList").val();

	//adding analog clock
	if(selectedWidget=="analogClock"){

		addAnalogClock();
	}
	//adding digital clock
	else if(selectedWidget=="digitalClock"){

		addDigitalClock();
	}
	//adding calendar
	else if(selectedWidget=="calendar"){

		addCalendar();
	}
	//adding weather
	else if(selectedWidget=="weather"){

		addWeather();
	}


}

//analog clock
function addAnalogClock(){

	//hiding widget area
	$(".placeholder").hide();

	//making card
 	var tmpHTML ="<div class='three columns'><div id='analClock' class='card' onclick=openAnalClock()><canvas id='analogClock' class='analogClock' width='150px' height='150px'>Awww! Your browser doesn't support canvas :/</canvas><span class='noonTime'></span></div></div>";

	//add widget only if widget area has space (i.e. has elements <4)
	if((widgetCounter<4)&&(wExist["analClock"] == 0)){

		$(".cardspace").append(tmpHTML);
		$(".card").show("slow");
		$("#analClock").css("border-bottom","5px solid #ce1616");
		
		//decrementing widget area size by increasing counte by 1	
		widgetCounter++;
		wExist["analClock"] = 1;
		
		//starting analog clock
		setInterval(startAnalogClock, 1000);

	}
	else{

		noSpace();
	}

}

//digital clock
function addDigitalClock(){

	//hiding widget area
	$(".placeholder").hide();

	//making card
 	var tmpHTML ="<div class='three columns'><div class='card' id='digiClock' onclick=openDigitalClock()></div></div>";

	//add widget only if widget area has space (i.e. has elements <4)
	if((widgetCounter<4)&&(wExist["digiClock"] == 0)){

		$(".cardspace").append(tmpHTML);
		$(".card").show("slow");
		$("#digiClock").css("border-bottom","5px solid #1fa815");

		//decrementing widget area size by increasing counter by 1		
		widgetCounter++;
		wExist["digiClock"] = 1;

		//starting digital clock
		setInterval(startDigitalClock, 1000);
	}
	else{

		noSpace();
	}

}

//calendar
function addCalendar(){

 	//hiding widget area
	$(".placeholder").hide();

	//making card
 	var tmpHTML ="<div class='three columns'><div class='card' id='calendar' onclick=openCalendar()><h4 class='month'></h4><table class='days' align='center'><tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr><tr></table></div></div>";

	//add widget only if widget area has space (i.e. has elements <4)
	if((widgetCounter<4)&&(wExist["calendar"] == 0)){

		$(".cardspace").append(tmpHTML);
		$(".card").show("slow");
		$("#calendar").css("border-bottom","5px solid #8809bf");

		//decrementing widget area size by increasing counter by 1		
		widgetCounter++;
		wExist["calendar"] = 1;

		//calling calendar function
		var now = new Date();
		generateCalendar(now);

	}
	else{

		noSpace();
	}


}

//weather
function addWeather(){

 	//hiding widget area
	$(".placeholder").hide();

	//making card
 	var tmpHTML ="<div class='three columns'><div class='card' id='weather' onclick=openWeather()><h1 class='temperature'></h1><h4 class='condition'></h4><h6 class='humidity'></h6><hr><h5 class='place'></h5></div></div>";

	//add widget only if widget area has space (i.e. has elements <4)
	if((widgetCounter<4)&&(wExist["weather"] == 0)){

		$(".cardspace").append(tmpHTML);
		$(".card").show("slow");
		$("#weather").css("border-bottom","5px solid #fca816");

		//decrementing widget area size by increasing counter by 1		
		widgetCounter++;
		wExist["weather"] = 1;

		//calling calendar function
		reportWeather();
		setInterval(reportWeather, 600000);	
	}
	else{

		alert("Widget area is full. You can't add more widgets");
	}

}

//open analogue clock
function openAnalClock(){

	//hiding add widget bar
	$(".wrapper").hide();

	//hiding widget area
	$(".cardspace").hide();

	//making enlarged widget card
 	var tmpHTML ="<div class='six columns'><canvas id='analogClockHome' class='analogClockHome' width='250px' height='250px'>Awww! Your browser doesn't support canvas :/</canvas></div><div class='six columns'><h4>Regional Time</h4><span class='noonTimeHome'></span><br><h4>UTC Time</h4><span class='unoonTime'></span><br><h4>UTC Time Offset</h4><span class='utcOffset'></span></div><div class='crossButton' onclick=closeCardHome()><i class='fa fa-times'></i>&nbsp;Close</div>";

 	//adding card to DOM
 	$(".cardhome").html(tmpHTML).fadeIn("slow");

 	//calling analogue clock home function
	setInterval(analClockHome,1000);


}

//open digital clock
function openDigitalClock(){

	//hiding add widget bar
	$(".wrapper").hide();

	//hiding widget area
	$(".cardspace").hide();

	//making enlarged widget card
 	var tmpHTML ="<div class='six columns'><h1 id='digiClockHomeDay' style='color:#1fa815'></h1><h3 id='digiClockHomeDate' style='color:#777'></h3><hr></div><div class='six columns'><h4>Regional Time</h4><span class='noonTimeHome'></span><br><h4>UTC Time</h4><span class='unoonTime'></span><br><h4>UTC Time Offset</h4><span class='utcOffset'></span></div><div class='crossButton' onclick=closeCardHome()><i class='fa fa-times'></i>&nbsp;Close</div>";

 	//adding card to DOM
 	$(".cardhome").html(tmpHTML).fadeIn("slow");

 	//calling digital clock home function
	setInterval(digiClockHome,1000);


}

//open calendar
function openCalendar(){

	//hiding add widget bar
	$(".wrapper").hide();

	//hiding widget area
	$(".cardspace").hide();

	//making enlarged widget card
 	var tmpHTML ="<h4 class='monthHome'></h4><table class='daysHome' align='center'><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr></table><span class='u-pull-left calControls' onclick=calPrev()><i class='fa fa-backward'></i>&nbsp;Previous</span> <span class='u-pull-right calControls' onclick=calNext()>Next&nbsp;<i class='fa fa-forward'></i></span><br><div class='crossButton' onclick=closeCardHome()><i class='fa fa-times'></i>&nbsp;Close</div>";

 	//adding card to DOM
 	$(".cardhome").html(tmpHTML).fadeIn("slow");

 	//calling calendar home function
	resetCal();



}

//open calendar
function openWeather(){

	//hiding add widget bar
	$(".wrapper").hide();

	//hiding widget area
	$(".cardspace").hide();

	//making enlarged widget card
 	var tmpHTML ="<div class='six columns'><h1 class='temperatureHome'></h1><h4 class='conditionHome'></h4><h6 class='windHome'></h6><h6 class='humidityHome'></h6><h6 class='pressureHome'></h6><h6 class='visibilityHome'></h6><h6 class='geoCoordHome'></h6><hr><h5 class='placeHome'></h5></div><div class='six columns'><h4 style='text-align:center;'>Forecast</h4><table class='weatherForecast' align='center'><tr><td>Date</td><td>Day</td><td>High</td><td>Low</td><td>Description</td></tr></table></div><div class='crossButton' onclick=closeCardHome()><i class='fa fa-times'></i>&nbsp;Close</div>";

 	//adding card to DOM
 	$(".cardhome").html(tmpHTML).fadeIn("slow");

 	//calling weather home function
 	weatherHome();
	setInterval(weatherHome,10800000);


}

//closing card home
function closeCardHome(){

	//hiding card home
	$(".cardhome").html("");

	//hiding card home
	$(".cardhome").hide();

	//showing add widget bar
	$(".wrapper").slideDown();

	//showing widget area
	$(".cardspace").show();

}

//if widget area is full or the selected widget exists already
function noSpace(){

	alert("Either widget area is full or the specified widget already exists.");
}

//reset widget area
function resetWidgetArea(){

	//hiding widget area
	if(widgetCounter>0){
	
		wExist["analClock"] = 0;
		wExist["digiClock"] = 0;
		wExist["calendar"] = 0;
		wExist["weather"] = 0;
		widgetCounter=0;
		$(".cardspace").html("");
		$(".placeholder").slideDown();

	}	
}