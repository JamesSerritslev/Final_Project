
import "bootstrap"

// VARS
let users = []
let total = 0
let submit = document.getElementById("submit")

// Event listeners
number.addEventListener("change", gettotal)
ticketoption.addEventListener("change", gettotal)
submit.addEventListener("click", adduser)
loadusers()



// Gets total price (for ticket amount times the price)
export function gettotal() {

    let option = document.getElementById("ticketoption").value
    let quantity = document.getElementById("number").value

    total = option * quantity

    document.getElementById("total").innerHTML = `$${total}`
}

// Creates dictionary with the information of a valid customer
// Customers with invalid credentials will be inputted as ""
// Restricts to only one input per name(first and last), email, and paymentinformation
// Catches blank forms upon input

export function adduser(e) {
    e.preventDefault()
    let user = {
        fname: document.getElementById("firstname").value,

        lname: document.getElementById("lastname").value,

        email: document.getElementById("email").value,

        pay: document.getElementById("paymentinfo").value,

        qty: document.getElementById("number").value,

        location: document.getElementById("location").value
    }

    if (user.fname.trim() && user.lname.trim() && user.email.trim() && user.pay.trim()) {
        for (let i in users) {
            if (user.fname == users[i].fname && user.lname == users[i].lname) {
                user = ''
                alert("Name is already taken")
                break
            } else if (user.email == users[i].email) {
                user = ''
                alert("Email is already taken.")
                break
            } else if (user.pay == users[i].pay) {
                user = ''
                alert("Payment information is already taken.")
                break
            } else {
                alert("Tickets Purchased! We will send an email with more information.")
                location.reload()
                break
            }

        }
        users.push(user)
        localStorage.setItem('users', JSON.stringify(users))

    } else {
        alert("Some information has been left blank.")
    }
}


export function loadusers() {

    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'))
    }
}


// 6 minute termination timer
// At 2 minutes displayes a 2 minute left warning
// At 0 minutes it will reset information and timer

function countdown(duration, display){
    var timer = duration, minutes, seconds
    setInterval(function()  {
        minutes = parseInt(timer/60,10)
        seconds = parseInt(timer%60,10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds


        display.textContent = minutes + ":" + seconds

        if(--timer == 120){
            alert("For security reasons the form will be cleared in 2 minutes")
            
        }else if(--timer < 0){
            location.reload()
            alert("Timeout: Information cleared. Please try again.")
            timer = duration
        }
    }, 1000);
}

window.onload = function(){
    var minutes = 360,
        display = document.getElementById("timer")
    countdown(minutes, display)
}













