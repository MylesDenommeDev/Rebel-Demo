
$(".header-button").on('click', function(event){
    event.stopPropagation()
    event.stopImmediatePropagation()

	/*Check if a mgmt box is open, destroy it*/
	if ($('#man001-box').children().length > 0 ){
		closeManageBox('man001-box')
	  }


	$('.header-button').each(function(index, element) {
        $(this).css({'color': 'rgb(224 223 229)', 'background-color' : 'rgb(69, 62, 97)'})
        })
		
	$(this).css({'background-color' : 'rgb(14,12,18,1)'})
	
	let section = $(this).attr('data-navButton')
	let sectionName = String(section)

	$("#main-container").css({'opacity' : '0',
							'transition' : '0.25s ease'
						})

						setTimeout(() => {
							$("#main-container").empty()
							$("#main-container").load( "../html/"+sectionName+".html", function() {
								loadTableData(sectionName)
							})
							
							$("#main-container").css({'opacity' : '1',
													  'transition' : '0.2s ease'
							})
						  }, "251")
	
})

/*This portion of code can be reused when the section is refreshed/button-clicked*/

loadTableData = (tableType) => {
	if(tableType== 'accounting'){
	/*1) Parse JSON for table data*/
	/*2) forEach line of data (artist), set the innerHTML (row) of the
	     <tbody> element, using the JSON data (jsonOBJ)*/
	$.getJSON("../inc/current_roster.json", function(jsonOBJ){
	   jsonOBJ['data'].forEach(current_line => {
		
		$('#roster-table-body').append(
		`<tr>
                <td>` + current_line['artist'] + `</td>
                <td>` + current_line['rate'] + `</td>
                <td>` + castCommaSepString(current_line['streams']) + `</td>
                <td>` +  calcTotalEarnings((current_line['rate'] * current_line['streams']).toFixed(2)) + `</td>
				<td>` + current_line['overdue'] + `</td>
              </tr>`
			  )
	   })
	
	})
	
	} else if (tableType== 'analytics'){
		//this page has not been implemented yet
		
	}
  }

  /*This function takes a number (int), and returns it as a comma-separated string like in real life*/
  function castCommaSepString(playcount){
	return playcount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  }

  function calcTotalEarnings(earnings){
	let leftPortion = ~~earnings
	leftPortion = castCommaSepString(leftPortion)

	let rightPortion = earnings.split(".")[1]
	
	return leftPortion + '.' + rightPortion
  }





  function openManageBox(manageType) {
	manageAnimation(manageType)

    $("#"+manageType + '-box').load( "../html/"+manageType+".html", function() {
		$(this).children().draggable({
			cancel: '.CANCEL-ME',
			cursor: "",
			containment: "#main-container",
			zIndex: '1',
		  start: function(){
			$(this).css({'left' : 'revert'
						})
			
		  },
			drag: function(){
				//this runs every time you click or drag the card one pixel
				$('*').css({'cursor' : 'grabbing'})
				},
			stop: function(){
				//runs when you stop dragging
				$('*').css({'cursor' : ''})
			}
			})

			$("#"+manageType + '-main-box').css({'visibility' : 'visible',
											'animation' : 'growBox 1.175s cubic-bezier(.41,-0.95,0.4,1.85)'
										  })
						if (currentSwitchType === 'add'){
						$("#man001-box-button-list").load( "../html/add.html", function() {
											console.log("setting initial menu state: add")
						})
						} else if (currentSwitchType === 'upd'){
							$("#man001-box-button-list").load( "../html/upd.html", function() {
								console.log("setting initial menu state: upd")
			})

						}

			$('#special-add-box-id').css({'text-decoration' : 'underline',
										  'background-color' : 'rgb(144 131 173)'
			})

		})
		
  }

  /* This function hids the box with the word "Manage" */
  function manageAnimation(manageID){
	$('#'+manageID).css({'opacity' : '1',
						'transform' : 'translateX(5rem)',
						'transition' : '1.175s cubic-bezier(.41,-0.95,0.4,1.85)'
	})
  }

   /* This is a reverse of the above animation */
   function manageAnimationOff(manageID){
	$('#'+manageID).css({'opacity' : '0.14',
						'transform' : '',
						'transition' : '1.175s cubic-bezier(1.85,0.4,-0.95,.41)'
	})
  }

  function closeManageBox(manageType) {
	manageType = manageType.substring(0,6)
	
	manageAnimationOff(manageType)
	$("#"+manageType + '-main-box').css({'opacity':'0.02',
		                                 'animation' : 'shrinkBox 1.175s cubic-bezier(.41,-0.95,0.4,1.85)' 
	})
	

	setTimeout(() => {
		$('#'+manageType+'-box').html('')
	  }, "1174")
	
  }

  let currentSwitchType = 'add'
  function switch_add_upd(switchType){
		addCount = 0
		valBuffer = ['empty','empty','empty','empty','empty']
	switch (switchType) {
		case 'add':
			currentSwitchType = 'add'
		  $('#special-add-box-id').css({'text-decoration' : 'underline',
		  'background-color' : 'rgb(144 131 173)'
		  })
		  $('#special-upd-box-id').css({'text-decoration' : 'none',
			'background-color' : 'rgb(138, 139, 146)'
			})
		  break;
		case 'upd':
			currentSwitchType = 'upd'
			$('#special-upd-box-id').css({'text-decoration' : 'underline',
			'background-color' : 'rgb(144 131 173)'
			})
			$('#special-add-box-id').css({'text-decoration' : 'none',
			'background-color' : 'rgb(138, 139, 146)'
			})
		  break;
		default:
		  console.log(`An error has occured, while trying to switch between add/upd mgmt options`)
	  }
	  
	  $("#man001-box-button-list").css({'opacity':'0.01',
	  										'animation' : 'shrinkBox 0.375s cubic-bezier(.41,-0.95,0.4,1.85)'
	  })
	  setTimeout(() => {
		$("#man001-box-button-list").html('')
		
			$("#man001-box-button-list").load( "../html/"+switchType+".html", function() {
				console.log("switching to management menu state: " + switchType)
			})
			$("#man001-box-button-list").css({'opacity':'1',
	  										'animation' : 'growBox 0.75s cubic-bezier(.41,-0.95,0.4,1.85)'
	  		})
		  
	  }, "376")

  }


  let addCount = 0
  let valBuffer = ['empty','empty','empty','empty','empty']

  function submitFormData(formType) {
	if(formType == 'upd'){
		currentSwitchType = 'upd'
	} else if (formType == 'add'){
		currentSwitchType = 'add'
	}
	let name = String($("input[type='text'][name='name']").val())
	//remove '.' from artist names like N.W.A., and replace with underscores
	name = name.replaceAll('.','_')
	let rate = (parseFloat(String($("input[type='text'][name='rate']").val())) % 1)
	//rate is truncated to 8 decimal places, and stored as only decimal portion, for safe traversal of other systems
	rate = String(rate).substring(2,10)
	console.log("Rate was changed over to a string like: " + rate)
	let streams = String($("input[type='text'][name='streams']").val())
	//Remove any commas from streams, in case user entered a human-readable number
	streams = streams.replaceAll(",", "")
	let overdue = String($("input[type='text'][name='overdue']").val())
	let check = true
	/*Basic check to make sure every form field is, at least, not empty*/
	if (name) {
		valBuffer[addCount] = name  + '.'
		if (rate) {
			valBuffer[addCount] += rate  + '.'
			if(streams) {
				valBuffer[addCount] += streams  + '.'
				if (overdue) {
					valBuffer[addCount] += overdue
					check = false
					if (addCount <= 4) {
						console.log("Valid CRUD buffer accepted: "+ valBuffer[addCount]+". You may add another.")
						addCount++
						$('#special-form-tag').parent().html('')
						if (currentSwitchType == 'add'){
							$('.man001-box-button-list-item').eq(addCount).load( "../html/special-form.html", function() {
							})
						} else if (currentSwitchType == 'upd') {
							$('.man001-box-button-list-item').eq(addCount).load( "../html/special-form-two.html", function() {
							})
						}
						

					} else {
						addCount = 0
					}
				}
			}
		}
	}

	if (check) {
		if(currentSwitchType == 'add'){
			$('#special-add-box-id').click()
		} else if(currentSwitchType == 'upd'){
			$('#special-upd-box-id').click()
		}
		
		
		addCount = 0
		valBuffer = ['empty','empty','empty','empty','empty']
	}

	
  }


  //http Post and GET request are defined in the following functions
  const URL = 'http://143.110.220.37:3000/'

  function specialSubmit() {
	
	let valString = ''
	console.log('Submit request ('+currentSwitchType+') for valBuffer: ' + valBuffer)
	
	
	
	//always goes five times, valBuffer initializes each array element to 'empty'
	for(let i = 0; i < valBuffer.length; i++){
	
		if(valBuffer[i] !== 'empty'){
			valString = valBuffer[i]
			valString = valString.split(".")
			console.log("Artist added to roster queue(db): " + valString[0])
		if(currentSwitchType == 'add'){
	fetch(URL, {
  method: "POST",
  body: JSON.stringify({
    artist: valString[0],
    rate: valString[1],
    streams: valString[2],
	overdue: valString[3],
	type: 'add'
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
  console.log('Sending JSON POST message to backend, for new record: ' + valBuffer[i])

} else if (currentSwitchType == 'upd') {
	fetch(URL, {
		method: "POST",
		body: JSON.stringify({
		  artist: valString[0],
		  rate: valString[1],
		  streams: valString[2],
		  overdue: valString[3],
		  type: 'upd'
		}),
		headers: {
		  "Content-type": "application/json; charset=UTF-8"
		}
	  })
		.then((response) => response.json())
		.then((json) => console.log(json));
		console.log('Sending JSON POST message to backend, for updated record: ' + valBuffer[i])
}
  
}//end of if statement
}//end of for loop per each item in valBuffer

	addCount = 0
	

	$('#man001-box-header-close-button').click()
  }

  function resetDB() {
	//not possible just by using the frontend interface, as client-side javascript will reject bad type of latter 3 values (float/in/int)
	//however a custom malicious post message could be crafted and this could be sent as such, better phrases could improve security here.
	fetch(URL, {
		method: "POST",
		body: JSON.stringify({
		  artist: 'this',
		  rate: 'is',
		  streams: 'the',
		  overdue: 'password'
		}),
		headers: {
		  "Content-type": "application/json; charset=UTF-8"
		}
	  })
		.then((response) => response.json())
		.then((json) => console.log(json));
		console.log('The Database has been restored to it\'s original state')
		$('#man001-box-header-close-button').click()
  }

