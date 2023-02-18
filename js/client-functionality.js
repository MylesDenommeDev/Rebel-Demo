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
								loadTableData()
							})
							
							$("#main-container").css({'opacity' : '1',
													  'transition' : '0.2s ease'
							})
						  }, "251")
	
})

/*This portion of code can be reused when the section is refreshed/button-clicked*/

loadTableData = () => {
	/*1) Parse JSON for table data*/
	/*2) forEach line of data (artist), set the innerHTML (row) of the
	     <tbody> element, using the JSON data (jsonOBJ)*/
	$.getJSON("../inc/roster_init.json", function(jsonOBJ){
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

						$("#man001-box-button-list").load( "../html/add.html", function() {
											console.log("setting initial menu state: add")
						})

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

  function switch_add_upd(switchType){
	
	switch (switchType) {
		case 'add':
		  $('#special-add-box-id').css({'text-decoration' : 'underline',
		  'background-color' : 'rgb(144 131 173)'
		  })
		  $('#special-upd-box-id').css({'text-decoration' : 'none',
			'background-color' : 'rgb(138, 139, 146)'
			})
		  break;
		case 'upd':
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

  function submitFormData(id) {
	let name = String($("input[type='text'][name='name']").val())
	let rate = String($("input[type='text'][name='rate']").val())
	let streams = String($("input[type='text'][name='streams']").val())
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
						$('.man001-box-button-list-item').eq(addCount).load( "../html/special-form.html", function() {
						})
					} else {
						addCount = 0
					}
				}
			}
		}
	}

	if (check) {
		$('#special-add-box-id').click()
		addCount = 0
		valBuffer = ['empty','empty','empty','empty','empty']
	}

	
  }


  function specialSubmit(type) {
	console.log('Submit request ('+type+') for valBuffer: ' + valBuffer)
	$('#man001-box-header-close-button').click()
  }