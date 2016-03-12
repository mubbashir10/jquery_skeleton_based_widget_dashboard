function analClockHome(){

	//making reference to date object
	var now = new Date();
	
	//getting now hour (in 12 hour format)
	var h = now.getHours() % 12;

	//getting now minutes
	var m = now.getMinutes();

	//getting now seconds
	var s = now.getSeconds();
	
	//selecting canvas (making dom object)
	var canvas = document.getElementById("analogClockHome");

	//defining context of canvas (i.e. 3d)
	var context = canvas.getContext("2d");
	
	//defining clock size
	var clockRadius = 130;

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
		context.lineWidth 	= (i % 3) ? 7 : 10;

		//defining colors of intervals
		context.strokeStyle = '#5A5A5A';
		
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
	
	var hProgress = (h/12) + (1/12)*(m/60) + (1/12)*	(1/60)*(s/60);
	var mProgress =                 (m/60) +        (1/60)*(s/60);
	var sProgress =                                        (s/60);
	
	//hours arm
	drawArm( hProgress, 8, 1/2, '#1D4E7F'); 
	drawArm( hProgress, 8, -5/clockRadius, '#1D4E7F'); 

	//minutes arm
	drawArm( mProgress,  5, 0.7, '#1D4E7F'); 
	drawArm( mProgress,  5, -2/clockRadius, '#1D4E7F'); 

	//seconds arm
	drawArm( sProgress,  3,   1, '#FF0000'); 
	drawArm( sProgress,  3, -10/clockRadius, '#FF0000'); 


	//getting standard time
  	m = ( m < 10 ? "0" : "" ) + m;
  	s = ( m < 10 ? "0" : "" ) + s;
  	var noon = ( h < 12 ) ? "AM" : "PM";
  	h = ( h > 12 ) ? h - 12 : h;
  	h = ( h == 0 ) ? 12 : h;
  	var nowTime = h + ":" + m + ":" + s + " " + noon;
  	var styles = {"font-size":"1.8rem","line-height":"1.6","letter-spacing":"0","display":"block","color":"#aaa"};
  	$(".noonTimeHome").html(nowTime).css(styles);

  	//getting standard time
  	uh = now.getUTCHours() % 12;
  	um = now.getUTCMinutes();
  	us = now.getUTCSeconds();
  	um = ( um < 10 ? "0" : "" ) +um;
  	us = ( um < 10 ? "0" : "" ) +us;
  	var unoon = ( uh < 12 ) ? "AM" : "PM";
  	uh = ( uh > 12 ) ? uh - 12 : uh;
  	uh = ( uh == 0 ) ? 12 : uh;
  	var unowTime = uh + ":" + um + ":" + us + " " + unoon;
  	$(".unoonTime").html(unowTime).css(styles);

  	//getting utc diffeence
  	var uDiff = now.getTimezoneOffset();
  	$(".utcOffset").html(uDiff).css(styles);


}