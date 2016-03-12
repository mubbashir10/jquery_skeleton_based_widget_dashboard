/*analog clock*/
function startAnalogClock()
{
	//making reference to date object
	var now = new Date();
	
	//getting now hour (in 12 hour format)
	var h = now.getHours() % 12;

	//getting now minutes
	var m = now.getMinutes();

	//getting now seconds
	var s = now.getSeconds();
	
	//selecting canvas (making dom object)
	var canvas = document.getElementById("analogClock");

	//defining context of canvas (i.e. 3d)
	var context = canvas.getContext("2d");
	
	//defining clock size
	var clockRadius = 80;

	//centering clock
	var clockX = canvas.width / 2;
	var clockY = canvas.height / 2;

	//making tau function (not present by default in math object)
	Math.TAU = 2 * Math.PI;
	
	//creating clock inside clock frame
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	//drawing clock background
	for (var i = 0; i < 12; i++)
	{
		//defing distance of intervals from inner circle
		var innerDist		= (i % 3) ? 0.75 : 0.65;

		//defing distance of intervals from outer circle
		var outerDist		= (i % 3) ? 0.95 : 1.0;
		
		//defining width of intervals
		context.lineWidth 	= (i % 3) ? 2 : 5;

		//defining colors of intervals
		context.strokeStyle = '#d6d6d6';
		
		//defining angle (in rad) of intervals
		var armRadians = (Math.TAU * (i/12)) - (Math.TAU/4);
		
		//horizontal placement of intervals
		var x1 = clockX + Math.cos(armRadians) * (innerDist * clockRadius);
		var y1 = clockY + Math.sin(armRadians) * (innerDist * clockRadius);

		//vertical placement of intervals
		var x2 = clockX + Math.cos(armRadians) * (outerDist * clockRadius);
		var y2 = clockY + Math.sin(armRadians) * (outerDist * clockRadius);
		
		//begining drawing
		context.beginPath();

		//start drawing from the center		
		context.moveTo(x1, y1);

		//drawing line to boundary 
		context.lineTo(x2, y2); 

		//drawing clock
		context.stroke();
	}
	
	//calculating arms movement and drawing arms
	function drawArm(progress, armThickness, armLength, armColor)
	{
		var armRadians = (Math.TAU * progress) - (Math.TAU/4);
		var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
		var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);

		context.lineWidth = armThickness;
		context.strokeStyle = armColor;

		context.beginPath();
		context.moveTo(clockX, clockY); // Start at the center
		context.lineTo(targetX, targetY); // Draw a line outwards
		context.stroke();
	}
	
	var hProgress = (h/12) + (1/12)*(m/60) + (1/12)*(1/60)*(s/60);
	var mProgress =                 (m/60) +        (1/60)*(s/60);
	var sProgress =                                        (s/60);
	
	//hours arm
	drawArm( hProgress, 7, 1/2, '#e5e5e5'); 
	drawArm( hProgress, 7, -5/clockRadius, '#e5e5e5'); 

	//minutes arm
	drawArm( mProgress,  4, 0.7, '#fff'); 
	drawArm( mProgress,  4, -2/clockRadius, '#fff'); 

	//seconds arm
	drawArm( sProgress,  2,   1, '#FF0000'); 
	drawArm( sProgress,  2, -10/clockRadius, '#FF0000'); 


	//if minutes or seconds are less than 10 then pad them with leading zero
  	m = ( m < 10 ? "0" : "" ) + m;
  	s = ( m < 10 ? "0" : "" ) + s;

  	//deciding wether AM or PM (if hour format is 12)
  	var noon = ( h < 12 ) ? "AM" : "PM";

  	//convert to 12 hour format (if hour format is 12)
  	h = ( h > 12 ) ? h - 12 : h;

  	//changing zero to twelve (if hour format is 12)
  	h = ( h == 0 ) ? 12 : h;

  	// Compose the string for display
  	var nowTime = h + ":" + m + ":" + s + " " + noon;

  	//making style rules
  	var styles = {"font-size":"1.8rem","line-height":"1.6","letter-spacing":"0","display":"block","text-align":"center"};

  	//printing time in 12 hour format
  	$(".noonTime").html(nowTime).css(styles);

}


/*digital clock*/
function startDigitalClock(){

	//making reference to date object
	var now = new Date();

	//getting now hours
	var nowHours = now.getHours();

	//getting now minutes
	var nowMinutes = now.getMinutes();

	//getting now seconds
	var nowSeconds = now.getSeconds();

	//if minutes or seconds are less than 10 then pad them with leading zero
  	nowMinutes = ( nowMinutes < 10 ? "0" : "" ) + nowMinutes;
  	nowSeconds = ( nowSeconds < 10 ? "0" : "" ) + nowSeconds;

	//getting current day
	var dayNum = now.getDay();
	var dayNameTmp = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var dayName = dayNameTmp[dayNum]

	//getting current month
	var monthNum = now.getMonth();
	var monthNameTmp = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var monthName = monthNameTmp[monthNum];

	//geting current date
	var currDate = now.getDate();

	//getting current year
	var currYear = now.getFullYear();

	// Compose the string for display
  	var nowTime = nowHours + ":" + nowMinutes + ":" + nowSeconds;

  	//printing time and date
  	$("#digiClock").html("<h2>"+nowTime+"</h2><hr><h1 style='color:#1fa815'>"+dayName+"</h1><h5 style='color:#777'>"+monthName+" "+currDate+", "+currYear+"</h5>");
	
}


/*calendar*/
function generateCalendar(now){
	
	//current month
	var monthNum = now.getMonth();
	var monthNameTmp = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var monthName = monthNameTmp[monthNum];

	//current date
	var currentDate = now.getDate();

	//total number of days in current month
	var totalDays = new Date(now.getFullYear(),now.getMonth() + 1, 0).getDate();

	//first day of current month
	var firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

	//making calendar array
	var calendar = new Array();

	//padding empty days
	for(var i=0; i<firstDay; i++){

		calendar.push("");

	}

	//if first day is Sunday
	if(firstDay==0){

		for(var i = 0; i<(totalDays+firstDay); i++){

			calendar.push(i-firstDay);
		}
	}

	//if first day is Monday
	else if(firstDay==1){

		for(var i = 1; i<(totalDays+firstDay); i++){

			calendar.push(i-firstDay);
		}
	}

	//if first day is Tuesday
	else if(firstDay==2){

		for(var i = 2; i<(totalDays+firstDay); i++){

			calendar.push(i-firstDay);
		}
	}

	//if first day is Wednesday
	else if(firstDay==3){

		for(var i = 3; i<(totalDays+firstDay); i++){

			calendar.push(i-firstDay);
		}
	}

	//if first day is Thursday
	else if(firstDay==4){

		for(var i = 4; i<(totalDays+firstDay); i++){

			calendar.push(i-firstDay);
		}
	}

	//if first day is Friday
	else if(firstDay==5){

		for(var i = 5; i<(totalDays+firstDay); i++){

			calendar.push(i-firstDay);
		}
	}

	//if first day is Saturday
	else if(firstDay==6){

		for(var i = 6; i<(totalDays+firstDay); i++){

			calendar[i]="i";
		}
	}

	//declaring days string
	var daysList ="";

	//creating days
	for(var i = 0; i<(totalDays+firstDay);i++){

		//next row if week is full
		if(i%7==0){

			daysList+="</tr>";
			daysList+="<tr>";
		}

		daysList += "<td>";

		//empty days
		if(i<firstDay){

			daysList += (calendar[i]);
		}

		//actual days
		else{

			if((i+1)==currentDate){
				
				daysList += "<span style='background:#8809bf;padding:5px;border-radius:100%;color:#fff;'>"+(calendar[i]+1)+"</span>";
			}
			else{

				daysList += (calendar[i]+1);
			}
		}
		daysList += "</td>";

	}

	//printing month
	$(".month").html(monthName+", "+now.getFullYear()).css({"text-align":"center","color":"#8809bf","border-bottom":"2px solid #777","margin-bottom":"15px"});

	//printing days
	$(".days").append(daysList);

	
}

/*weather*/
function reportWeather(){

	//getting user location
	var xmlhttp = new XMLHttpRequest();

	//defining JSON source
	var url = "http://ipinfo.io/json";
	
	//calling parse JSON function if source is found and loaded
	xmlhttp.onreadystatechange=function() {
		
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        parseLocationJSON(xmlhttp.responseText);
	    }
	}

	//opening connection
	xmlhttp.open("GET", url, true);

	//sending data
	xmlhttp.send();	

	//parse JSON
	function parseLocationJSON(response) {

	    //converting JSON object to js object		
	    var data = JSON.parse(response);

	    //getting coordinates
	    var locationTmp = data["loc"];
	    var locationArray = locationTmp.split(",");
	    var lat = locationArray[0];
	    var lon = locationArray[1];

	    //getting weather of fetched coordinates
	    readWeatherJSON(lat,lon);

	}

	//get weather
	function readWeatherJSON(lat,lon){

		//making reference to XMLHTTPRequest API
		var xmlhttp = new XMLHttpRequest();

		//defining JSON source
		var url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=f819161e8a8cb5ad3697524b0ab7a766&units=metric";
		
		//calling parse JSON function if source is found and loaded
		xmlhttp.onreadystatechange=function() {

		    //calling display function once resource file is found and loaded		
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        parseWeatherJSON(xmlhttp.responseText);
		    }
		}

		//opening connection
		xmlhttp.open("GET", url, true);

		//sending data
		xmlhttp.send();	

		//parse JSON
		function parseWeatherJSON(response) {

		    //converting JSON object to js object		
		    var data = JSON.parse(response);

		    //temperature
		    var temp = data["main"].temp;
		    $(".temperature").html(temp+" °C"); 

		    //condition
		    var condition = data["weather"][0].main;
		    $(".condition").html(condition).css("color","#777");

		    //humidity
		    var humidity = data["main"].humidity;
		    $(".humidity").html("Humidity: "+humidity).css("color","#777");

		    //place
		    var city = data["name"];
		    var country = data["sys"].country;
		    $(".place").html(city+", "+country).css("color","#fca816");  


		}

	}	

}
