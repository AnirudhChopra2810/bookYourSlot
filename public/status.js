
getData();
let session_started = document.getElementById('session_started');
let session_inProcess = document.getElementById('session_in_process');
let session_ended = document.getElementById('session_ended');
let link = document.getElementById('link');
console.log(localStorage.getItem("data"))
const data = JSON.parse(localStorage.getItem('data'))
console.log(data);
console.log(data.Date);

window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}

function timer (date) {

    let countDownDate = new Date(`${data.Date} 00:10:00`).getTime();
    console.log(countDownDate);


  let x = setInterval(function() {
  let now = new Date().getTime();
  alert(now);
    
  let timeLeft = countDownDate - now;
    
  let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("timmer").innerHTML = days + "D : " + hours + "H : "
  + minutes + "M : " + seconds + "S ";
  alert(document.getElementById("timmer").innerHTML);


    
     session_inProcess.style["color"] = '#48bb78';
     session_ended.style["color"] = "#fff200";
     session_started.style['color'] = '#fff200'; 

     if(timeLeft < 10 && timeLeft > 0){
         location.reload();
     }
    
  if (timeLeft < 0) {
      clearInterval(x);
    //   const ID = localStorage.getItem(id);
     session_ended.style["color"] = "#48bb78";
     session_started.style['color'] = '#fff200';
     session_inProcess.style["color"] = '#fff200'; 
    link.innerHTML = `PLEASE CLICK THE LINK TO START MEETING: ` + '<br></br>' + `<a href="https://${window.location.hostname}/appointment/${data.Id}" style="color: blue">https://${window.location.hostname}/appointment/${data.Id}</a>`;
    document.getElementById("tracker").innerHTML = "Your Meeting Has Started";
  }
}, 1000);

}


function getData (name, email, message) {
    
    let date = null;
    const url = `https://${window.location.hostname}/status`;
    axios.get(url)
    .then(response => {
        console.log(response)
        const data = {Date: response.data.Date, Id: response.data.Id};
        localStorage.setItem("data", JSON.stringify(data) );
        // localStorage.setItem("id", response.data.Id);
        timer();
    })
    .catch(error => console.log(error))
}