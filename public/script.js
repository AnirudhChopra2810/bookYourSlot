const form = document.getElementById('form');
let Fecha_end_input = document.getElementById("#Fecha_end")
console.log(Fecha_end_input.value)

let n =  new Date();
let y = n.getFullYear();
let m = n.getMonth() + 1;
let d = n.getDate();

if(m < 10)
   m = '0' + m.toString();
else if(d < 10)
   d = '0' + d.toString();

let minDate = y + '-' + m + '-' + d
let maxDate = y + '-' + "0"+(parseFloat(0+m) + 1) + '-' + d

Fecha_end_input.setAttribute("min",minDate)
Fecha_end_input.setAttribute("max",maxDate)



form.addEventListener('submit', (event) => {
    event.preventDefault(); //prevents form from auto submision.
    let _name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    
    postData(_name, email, message);
    form.reset();
    console.log({name: _name, email: email, message: message});
})

function reset() {
    form.reset();
}

function postData (name, email, message) {
    alert("A confirmation mail has been sent to your gmail, You can track your booking status through the provided link.")
    const url = `http://${window.location.hostname}:3000`;
    axios.post(url, {name: name, email: email, message: message, date: Fecha_end_input.value})
    .then(response => {
        console.log(response);
    })
    .catch(error => console.log(error))
}