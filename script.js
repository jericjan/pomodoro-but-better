alarm = new Audio('alarm.m4a')
alarm.loop = true
let lastDone = 'long'
let count = 0
let extraWork = 0
let extraBreak = 0
const workTime = 25
const shortTime = 5
const longTime = 15
let offsetBreak = true

function showExtends () {
  if (lastDone == 'work') {
    document.querySelector('#moreWorkBtn').style.display = 'initial'
  } else {
    document.querySelector('#moreBreakBtn').style.display = 'initial'
  }
}

function hideExtends () {
  document.querySelector('#moreWorkBtn').style.display = 'none'
  document.querySelector('#moreBreakBtn').style.display = 'none'
}

function doro (minutes, text, bgColor, boxColor) {
  document.body.classList.remove("flashing")
  hideExtends()
  document.body.bgColor = bgColor
  var texts = document.querySelectorAll('h1,p')
  for (let i = 0; i < texts.length; i++) {
	texts[i].classList.remove("txt-flashing")
  }  
  const boxes = document.querySelectorAll('.box')
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = boxColor
	boxes[i].classList.remove("flashing")
  }
  console.log(`${minutes} minute countdown started`)
  document.querySelector('#goBtn').disabled = true
  document.querySelector('#goBtn').textContent = "YOU CAN'T STOP THE PASSAGE OF TIME"
  alarm.pause()
  alarm.currentTime = 0
  const elem = document.createElement('h1')
  const timeDone = document.createElement('p')
  elem.style.marginBottom = '0'
  timeDone.style.marginTop = '0'
  elem.appendChild(timeDone)
  timeDone.textContent = strftime('%I:%M %p', new Date())
  document.querySelector('#work-div').prepend(timeDone)
  document.querySelector('#work-div').prepend(elem)

  elem.textContent = text

  const countDownDate = new Date(new Date().getTime() + minutes * 60000).getTime()

  $('#countdown')
    .countdown(countDownDate)
    .on('update.countdown', function (event) {
      $(this).text(
        event.strftime('%M:%S')
      )
    })
    .on('finish.countdown', function (event) {
      $(this).text(
        event.strftime('00:00')
      )
      alarm.play()
      showExtends()
      document.querySelector('#goBtn').disabled = false
      document.querySelector('#goBtn').textContent = 'GO'
	  document.body.classList.add("flashing")
	  for (let i = 0; i < boxes.length; i++) {
		boxes[i].classList.add("flashing")
	  }
	  var texts = document.querySelectorAll('h1,p')
	  for (let i = 0; i < texts.length; i++) {
		texts[i].classList.add("txt-flashing")
	  } 	  
    })
}

function work () {
  const minutes = workTime + extraWork
  const bgColor = '#b50000'
  const boxColor = '#d50000'
  const msg = (extraWork) ? `WORK +${extraWork}min` : 'WORK'
  doro(minutes, msg, bgColor, boxColor)
  extraWork = 0
  document.querySelector('#extra-work').textContent = ''
}

function shortBreak () {
  const minutes = shortTime + extraBreak
  const bgColor = 'green'
  const boxColor = '#00a91a'
  const msg = (extraBreak) ? `SHORT BREAK +${extraBreak}min` : 'SHORT BREAK'
  doro(minutes, msg, bgColor, boxColor)
  extraBreak = 0
  document.querySelector('#extra-break').textContent = ''
}

function longBreak () {
  const minutes = longTime + extraBreak
  const bgColor = '#00ad71'
  const boxColor = '#00d38a'
  const msg = (extraBreak) ? `LONG BREAK +${extraBreak}min` : 'LONG BREAK'
  doro(minutes, msg, bgColor, boxColor)
  extraBreak = 0
  document.querySelector('#extra-break').textContent = ''
}

function go () {
  offsetBreak = true
  document.querySelector('#work-div').style.display = 'block'
  if (lastDone == 'work') {
    if (count == 4) {
      longBreak()
      lastDone = 'long'
      count = 0
    } else {
      shortBreak()
      lastDone = 'short'
    }
  } else {
    work()
    lastDone = 'work'
    count++
  }
}

function moreWork () {
  if (count == 4) {
    extraBreak += longTime
    document.querySelector('#extra-break').textContent = `+${extraBreak} minutes for next break`
    console.log(`extraBreak ${longTime} added`)
    count = 1
  } else {
    extraBreak += shortTime
    document.querySelector('#extra-break').textContent = `+${extraBreak} minutes for next break`
    console.log(`extraBreak ${shortTime} added`)
    count++
  }
  work()
}

function moreBreak () {
  if (offsetBreak) {
    count++
  }
  offsetBreak = false
  console.log(`count: ${count}`)
  extraWork += workTime
  document.querySelector('#extra-work').textContent = `+${extraWork} minutes for next work`
  console.log(`extraWork ${workTime} added`)
  if (count == 4) {
    longBreak()
    count = 1
  } else {
    shortBreak()
    count++
  }
}
