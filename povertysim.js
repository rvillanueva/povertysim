
 //Extra Job Sliders
// Need to include functionality to turn jobTotal hours text red when not 100% utilized.

function onLoad(){
//Characteristics
	satisfaction = 1000,
    money = 500,
	sanitation = 100,
	food = 100,
	health=100;

// Job Variables
		job = new Array(0,0,0),
		jobIncome = new Array,
		jobTotalIncome = new Array;
		
		$( "#chlorineButton" ).hide();
		$( "#childrenContainer" ).hide();
		document.getElementById('sanitationField').innerHTML = sanitation;

// Chlorine
	chlorineCheck = 0,
	chlorinePress = false,
	chlorine = false;
	
// Children
	$( ".hideOnload").hide();
	
	$( "#wrapper").show();
	
	dashboardUpdate();

}


// Update Dashboard

function dashboardUpdate(){
	
	$( "#satisfactionField" ).html( satisfaction );
	$( "#moneyField" ).html( money );
	$( "#foodField" ).html( food );
	$( "#healthField" ).html( health );
}

   $(function() {
    $( "input[type=submit]" )
      .button()
      .click(function( event ) {
        event.preventDefault();
      });
  });	
  
// Jobs Section
  
  function refreshJobTotal() {
      jobTotal = job[0] + job[1] + job[2];
	  $( "#jobTotal" ).val( jobTotal + "%");
	  
	// Set job income patterns.
	  jobIncome[0] = .2*Math.pow(job[0], 2) + job[1]*1.5;
	  jobIncome[1] = .1*Math.pow(job[1], 2) + job[2]*3;
	  jobIncome[2] = .3*Math.pow(job[2], 2) + job[3]*4;
	  
	  for (var i = 0; i < 3; i++) {
	  $( "#jobIncomeField" + i ).html( "$" + jobIncome[i] );

	  if (job[i] > 0){
	  $( "#jobIncomeAverage" + i ).html( "$" + jobIncome[i]/(job[i]+1) );
	  }
	  else {
		$( "#jobIncomeAverage" + i ).html( "$0");
	  }
	  
	  }
	  jobTotalIncome = jobIncome[0] + jobIncome[1] + jobIncome[2];
  }
 
  $(function() {
	  for (var i = 0; i < 3; i++) {
    $( "#jobSlider" + i ).slider({
      value:0,
      min: 0,
      max: 100,
      step: 10,
      slide: function( event, ui ) {
        $( "#jobAmount" + i ).val( ui.value + "%" );
		job[i] = ui.value,
		console.log(i + ' ' + job[i]);
		console.log('job0, ' + job[0]);
		refreshJobTotal( );
      },
	  change: function(event, ui ){
		  refreshJobTotal();
	  }
    });
    $( "#jobAmount" + i).val( $( "#jobSlider" + i).slider( "value" ) + "%" );
	  }
  });
//
//  $(function() {
//    $( "#jobSlider2" ).slider({
//      value:0,
//      min: 0,
//      max: 100,
//      step: 10,
//      slide: function( event, ui ) {
//        $( "#jobAmount2" ).val( ui.value + "%" );
//		job2 = ui.value,
//		refreshJobTotal( );
//      },
//      change: function(event, ui ){
//		  refreshJobTotal();
//	  }
//    });
//    $( "#jobAmount2" ).val( $( "#jobSlider2" ).slider( "value" ) + "%" );
//  });
//  
//  
//  $(function() {
//    $( "#jobSlider3" ).slider({
//      value:0,
//      min: 0,
//      max: 100,
//      step: 10,
//      slide: function( event, ui ) {
//        $( "#jobAmount3" ).val( ui.value + "%" );
//		job3 = ui.value,
//		refreshJobTotal( );
//      },
//      change: function(event, ui ){
//		  refreshJobTotal();
//      }
//    });
//    $( "#jobAmount3" ).val( $( "#jobSlider3" ).slider( "value" ) + "%" );
//  });

  
  // Extra Jobs decision outcome

	function jobOutcome() {
		jobActualIncome = jobTotalIncome;
		if( jobTotal === 100 ) {
			window.location = "#/5"
		}
		else {
			document.getElementById('jobErrorBox').innerHTML = 'Total must equal 100%.';
		}
		if (jobIncome[0] >= jobIncome[1] && jobIncome[0] >= jobIncome[2]){
			jobOutput = "Unfortunately, the price of fabric increased drastically, and as a result, your tailoring job failed and you lose that income stream.";
			document.getElementById('jobLoss').innerHTML = jobIncome[0];
			document.getElementById('jobLossPercent').innerHTML = Math.round(jobIncome[0]/jobTotalIncome*100);
			money = jobTotalIncome - jobIncome[0];
		}
		else if (jobIncome[1] > jobIncome[0] && jobIncome[1] >= jobIncome[2]){
			jobOutput = "Nobody seems to need furniture this season.  You made nearly no money on your furniture-making business.";
			document.getElementById('jobLoss').innerHTML = jobIncome[1];
			document.getElementById('jobLossPercent').innerHTML = Math.round(jobIncome[1]/jobTotalIncome*100);
			jobActualIncome = jobTotalIncome - jobIncome[1];
		}
		else {
			jobOutput = "Wild animals came through and killed your chickens and tore through your food storage.  All your cooking efforts have gone to waste and you have made no income from it this season.";
			document.getElementById('jobLoss').innerHTML = jobIncome[2];
			document.getElementById('jobLossPercent').innerHTML = Math.round(jobIncome[2]/jobTotalIncome*100);
			jobActualIncome = jobTotalIncome - jobIncome[2];
		}
		document.getElementById('jobOutcomeDiv').innerHTML = jobOutput;
		document.getElementById('jobActualIncome').innerHTML = jobActualIncome;
		money = money + jobActualIncome;
		dashboardUpdate();
	}

// Purchasing - Food

  function refreshFoodTotal() {
      foodTotal = food1;
	  $( "#foodTotal" ).val( foodTotal);
  }

  $(function() {
    $( "#foodSlider1" ).slider({
      value:0,
      min: 0,
      max: 100,
      step: 10,
      slide: function( event, ui ) {
        $( "#foodAmount1" ).val( ui.value );
		food1 = ui.value,
		refreshFoodTotal( );
      }
    });
    $( "#foodAmount1" ).val( $( "#foodSlider1" ).slider( "value" ) );
  });

// Purchasing - Seeds Radio Options

  $(function() {
    $( "#seedsRadio" ).buttonset();
  });

  $(function() {
    $( "#fertilizerRadio" ).buttonset();
  });
  
// Chlorine Functions

function chlorineClick(){
	chlorinePress = true;
}

function chlorineYes(){
	chlorine = true;
	$( "#chlorineButton" ).show();
	chlorineCheck = true;
	chlorinePress = true;
	money = money - 5;
	dashboardUpdate();
}

function chlorineNo(){
	chlorine = false;
	chlorineCheck = true;
	sanitation = 0;
	document.getElementById('chlorineHeader').innerHTML = "Chlorine Not Purchased";
	document.getElementById('chlorineText').innerHTML = "You decided to not get chlorine.  It doesn't really taste that great anyways, and you know a lot of people stop using it because it's inconvenient.";

}

function chlorineRunCheck(){
	if( sanitation > 0 && chlorineCheck == true && chlorinePress == false && chlorine == true ) {
		sanitation = sanitation - 10;
	}
	else {
		chlorinePress = false;
	}
	document.getElementById('sanitationField').innerHTML = sanitation;
}

// Children Section


// Dowry Cost

function refreshChildrenOutput(n, ui){
	var dowryGender,
	dowryAmount,
	dowryCost = 1200,
	dowryReceived = 1200,
	childrenManualLaborOutput = Math.max((70*(13 - ui)),0),
	childrenSkilledLaborOutput = Math.round(Math.pow(ui,1.5)*20),
	childrenSchoolCost = 14*(ui),
	childrenLivingCost = 360,
	childrenNetWorth,
	dowrySign = "+";
	if (childrenGender[n-1] == "boy"){
		dowryGender = "received";
		dowryAmount = dowryReceived;
	}
	else{
		dowryGender = "cost";
		childrenManualLaborOutput = Math.max((70*(13 - ui)),0);
		childrenSkilledLaborOutput = Math.round(Math.pow(ui,1.5)*20);
		dowryAmount = dowryCost;
		dowrySign = "-";
	}
	childrenNetWorth = childrenManualLaborOutput + childrenSkilledLaborOutput - childrenLivingCost - childrenSchoolCost + dowryAmount;
	$( "#childrenDowry" + n ).html(dowrySign + " Expected future dowry " + dowryGender + ": $" + dowryAmount);
	$( "#childrenManualLabor" + n ).html("$" + childrenManualLaborOutput);
	$( "#childrenSkilledLabor" + n ).html("$" + childrenSkilledLaborOutput);
	$( "#childrenSchoolCost" + n ).html("$" + childrenSchoolCost);
	$( "#childrenLivingCost" + n ).html("$" + childrenLivingCost);
	$( "#childrenNetWorth" + n ).val("$" + childrenNetWorth);
}

var childrenGender = new Array();
childrenGender[0] = "boy";
childrenGender[1] = "girl";
childrenGender[2] = "girl";
childrenGender[3] = "boy";
childrenGender[4] = "girl";
childrenGender[5] = "boy";
childrenGender[6] = "girl";

var childrenBorn = new Array();
childrenBorn[0] = false;
childrenBorn[1] = false;
childrenBorn[2] = false;
childrenBorn[3] = false;
childrenBorn[4] = false;
childrenBorn[5] = false;
childrenBorn[6] = false;

function childrenConceive(n){
	$( "#childrenConceiveButton" + n ).hide();
	$( "#childrenDone" + n ).hide();
	$( "#childrenContainer" + n ).html( "Congratulations! You conceived, and you are starting to get a baby bulge.<br><br>Do you want to learn the baby's gender?<br><br>");
	$( "#childrenGenderCheck" + n ).show();
}
function genderCheck(n, check){
	$( "#childrenGenderCheck" + n ).hide();
	var midwifeSays = "";
	if (check == true){
		if (childrenGender[n - 1] == "girl") {
		midwifeSays = "The midwife looks at you apologetically and asks what you want to do now."
		}
		else {
			midwifeSays = "Congratulations!"
		}
	$( "#childrenContainer" + n ).html( "You discovered that you are going to have a <b>baby " + childrenGender[n - 1] + ".</b> " + midwifeSays + "<br><br><b>Do you want to keep it?</b>  The slider below shows how much you expect the child to contribute if you send the child to work or to school.");
	money = money - 10;
	$( "#abortionContainer" + n).show();
	}

	$( "#childrenSliderContainer" + n).show();
	refreshChildrenOutput(n, 0);
	dashboardUpdate();
	if (check == false){
		childrenKeep(n, true);
	}
}

function childrenKeep(n, keep){
	if (keep) {
		childrenBorn[n - 1] = true;
		$( "#childrenContainer" + n ).html("Congratulations on your beautiful <b>baby " + childrenGender[n-1] + "</b>! You can now choose to have more kids.  (You will be able to come back and adjust education decisions for all your children before finalizing your choices.)");
	}
	else {
		childrenBorn[n - 1] = false;
		$( "#childrenContainer" + n ).html("You sadly decide to abort your new baby " + childrenGender[n-1] + ".  You know you wouldn't have the resources to support the child.");
		$( "#childrenSliderContainer" + n).hide();

	}
	$( "#abortionContainer" + n).hide();
	$( "#childrenDone" + n).hide();
	$( "#childrenNext" + n).show();
}

  $(function() {
    $( "#childrenSlider" + 1 ).slider({
      value:0,
      min: 0,
      max: 12,
      step: 1,
      slide: function( event, ui ) {
        $( "#childrenYears" + 1 ).val( ui.value );
		refreshChildrenOutput(1, ui.value);
      },
	  change: function(event, ui ){
		  refreshChildrenOutput(1, ui.value);
	  }
    });
    $( "#childrenYears" + 1 ).val( $( "#childrenSlider" + 1 ).slider( "value" ) );
  });

  $(function() {
    $( "#childrenSlider" + 2 ).slider({
      value:0,
      min: 0,
      max: 12,
      step: 1,
      slide: function( event, ui ) {
        $( "#childrenYears" + 2 ).val( ui.value );
		refreshChildrenOutput(2, ui.value);
      },
	  change: function(event, ui ){
		  refreshChildrenOutput(2, ui.value);
	  }
    });
    $( "#childrenYears" + 2 ).val( $( "#childrenSlider" + 2 ).slider( "value" ) );
  });

// Diarrhea

function diarrheaCheck(){
	if (sanitation >= 75){
	diarrheachild1 = 0;
		document.getElementById('diarrheaContainer').innerHTML = ("Unfortunately, even though you used chlorine regularly in your drinking water and cooking, your youngest child has contracted a particularly bad case of diarrhea. What would you like to do?");
	}
	else if (sanitation < 75 && sanitation >= 25){
		document.getElementById('diarrheaContainer').innerHTML = ("Unfortunately, you did not use chlorine as often as you should have and your youngest son and daughter have contracted a particularly bad case of diarrhea. What would you like to do?");
	}
	else {
		document.getElementById('diarrheaContainer').innerHTML = ("Unfortunately, you hardly used any chlorine to keep your water safe and all your children have contracted a particularly bad case of diarrhea. What would you like to do?");
	}
}

function diarrheaTreatment(treatment){
	if(treatment == 1){
		$( "#diarrheaOutcome").html("You decided to go to the doctor, who was absent from the clinic that day.  Discouraged, you went home and decided to wait it out.  Sadly, your youngest child died from dehydration due to diarrhea.");
	}
	else if(treatment == 2){
		$( "#diarrheaOutcome").html("You decide to give your children salt and sugar.  Despite this treatment, your youngest child died from dehydration due to diarrhea.");
	}
	else{
		$( "#diarrheaOutcome").html("You decided to do nothing and wait it out.  Sadly, three of your children died from dehydration due to diarrhea.");
	}
}

//Neighbor in Need

function neighborStop(check){
	if (check == true){
		$( "#neighborOutcome").html("You stop the neighbors and save $40 worth of crops, but they are angry and humiliated.  You don't think they're going to help you out any time in the future.");
	}
	else{
		$( "#neighborOutcome").html("You let your neighbors take $40 worth of crops.  You've lost some income, but you know that if you ever run into problems in the future, they'll remember your help.");
		money = money - 40;
	}
}

$(document).ready(function() {
 onLoad();
});
