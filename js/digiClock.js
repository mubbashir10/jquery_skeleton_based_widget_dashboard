/*digital clock*/
function digiClockHome(){

	//making reference to date object
	var now = new Date();

	//getting current time
	var h = now.getHours() % 12;
	var m = now.getMinutes();
	var s = now.getSeconds();

	//getting current day
	var dayNum = now.getDay();
	var dayNameTmp = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var dayName = dayNameTmp[dayNum];
	$("#digiClockHomeDay").html(dayName);

	//getting current month
	var monthNum = now.getMonth();
	var monthNameTmp = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var monthName = monthNameTmp[monthNum];

	//geting current date
	var currDate = now.getDate();

	//getting current year
	var currYear = now.getFullYear();
	$("#digiClockHomeDate").html(monthName+" "+currDate+", "+currYear);

	//defining styles
	var styles = {"font-size":"1.8rem","line-height":"1.6","letter-spacing":"0","display":"block","color":"#aaa"};

  	//getting standard time
  	m = ( m < 10 ? "0" : "" ) + m;
  	s = ( m < 10 ? "0" : "" ) + s;
  	var noon = ( h < 12 ) ? "AM" : "PM";
  	h = ( h > 12 ) ? h - 12 : h;
  	h = ( h == 0 ) ? 12 : h;
  	var nowTime = h + ":" + m + ":" + s + " " + noon;
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

  	//printing time and date
  	$("#digiClockHome").html(nowTime);
	
}