// Get the value from Current date
var today = new Date();
var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
var number = "#" + today.getFullYear()+ (today.getMonth()+1) +today.getDate();
document.getElementById("currentDate").textContent = date;
document.getElementById("number").textContent = number;