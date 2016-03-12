//making reference to date object
var curr = new Date();

//current year
var currYear = curr.getFullYear();

//current month
var monthNum = curr.getMonth();
var monthNameTmp = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var monthName = monthNameTmp[monthNum];

//current date
var currentDate = curr.getDate();

//seed
var now = new Date(currYear,monthNum,currentDate);

//next
function calNext(){

    monthNum = monthNum+1;

    if(monthNum>11){
      currYear=currYear+1;
      monthNum=0;
    }

   now = new Date(currYear,monthNum,currentDate);
   calendarHome()
 }

//previous
function calPrev(){

    monthNum = monthNum-1;

    if(monthNum<0){
      currYear=currYear-1;
      monthNum=11;
    }

    now = new Date(currYear,monthNum,currentDate);
   	calendarHome()
 }  

//reset
function resetCal(){

	var now = new Date();
	calendarHome();
}


//calendar
function calendarHome(){

	//cleaning previous build
	$(".monthHome").html("");
	$(".daysHome").html("");

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
				
				daysList += "<span style='background:#d41ced;padding:5px;border-radius:100%;color:#fff;'>"+(calendar[i]+1)+"</span>";
			}
			else{

				daysList += (calendar[i]+1);
			}
		}
		daysList += "</td>";

	}

	//current month
	var mNum = now.getMonth();

	//printing month
	$(".monthHome").html(monthNameTmp[mNum]+", "+now.getFullYear()).css({"text-align":"center","color":"#d41ced","border-bottom":"2px solid #777","margin-bottom":"15px"});

	//printing days
	$(".daysHome").append(daysList);
	
}

