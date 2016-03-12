function weatherHome(){

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

	    //getting locaton coordinates
	    var place = data["city"] +", "+ data["country"];
		$(".placeHome").html(place).css("color","#fca816");

	    //getting weather of fetched coordinates
	    readWeatherJSON(place);

	}

	//get weather
	function readWeatherJSON(place){

		//making reference to XMLHTTPRequest API
		var xmlhttp = new XMLHttpRequest();

		//defining JSON source
		var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+place+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

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
		    var temp = data["query"].results.channel.item.condition.temp;
		    $(".temperatureHome").html(temp+" °F"); 

		    //condition
		    var condition = data["query"].results.channel.item.condition.text;
		    $(".conditionHome").html(condition).css("color","#777");

		    //wind speed
		   	var wind =data["query"].results.channel.wind.speed;
		    $(".windHome").html("Wind Speed: "+wind+" mph").css("color","#999");

		    //humidity
		   	var humidity = data["query"].results.channel.atmosphere.humidity;
		    $(".humidityHome").html("Humidity: "+humidity).css("color","#999");

		   	//pressure
		   	var pressure = data["query"].results.channel.atmosphere.pressure;
		    $(".pressureHome").html("Pressure: "+pressure+" in").css("color","#999");

		    //visibility
		   	var visibility = data["query"].results.channel.atmosphere.visibility;
		    $(".visibilityHome").html("Visibility: "+visibility).css("color","#999");

		    //geo coord
		   	var geoCoordLong = data["query"].results.channel.item.long;
		   	var geoCoordLat = data["query"].results.channel.item.lat;
		    $(".geoCoordHome").html("Geo Coordinates: ("+geoCoordLong+", "+geoCoordLat+")").css("color","#999");

		    //forecast
		    var fData = data["query"].results.channel.item; 
		    console.log(data["query"].results.channel.item.forecast);
		    for(var i=0; i<5; i++){
			
				$(".weatherForecast").append("<tr><td>"+fData.forecast[i].date+"</td><td>"+fData.forecast[i].day+"</td><td>"+fData.forecast[i].high+"</td><td>"+fData.forecast[i].low+"</td><td>"+fData.forecast[i].text+"</td></tr>");
			
			}


		}

	}	

}