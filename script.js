const time = document.getElementById("time")
const date = document.getElementById("date")
const plus = document.getElementById("plus")
const inputbox = document.getElementById("searchbox");

function menu(){
     inputbox.classList.toggle('show')
     
     
}

setInterval(
     function dateTime(){
          const currentTime = new Date;
          const hour = currentTime.getHours();
          var minute = currentTime.getMinutes();;
          const day = currentTime.getDay();
          const CurrentDate = currentTime.getDate();
          const month = currentTime.getMonth();
          
          if(hour >=13){
               var hours = (hour + 11) % 12 + 1;
          }
          else{
               var hours = hour;
          }
          if(hour>12){
               var amPm = 'PM';

          }
          else{
               var amPm = "AM";
          }
          if(minute <10){
               var minute = "0" + minute ;
          }
          else{ 
               var minute = minute;
          }
          const days =['sun','Mon','Tue','Wed','Thu','Fri','Sat']
          const months =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
          
          
          

          time.innerHTML = hours + ':' + minute + " " + `<span id="am-pm">${amPm}</span>`;
          date.innerHTML = `<p class="day" id="date">${days[day] +','+ ' ' + CurrentDate + " " + months[month]}</p>`;


     },1000);
     
getLocation()
function getLocation(){
     navigator.geolocation.getCurrentPosition((success)=>{
             
          let lat = success.coords.latitude;
          let long = success.coords.longitude;
          console.log(lat, long)
          api()

          async function api(){
               const link = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e0a9538e363bdc498c473dc6fe344cea`)
               const data =  await link.json();
               

               document.getElementById("humidity").innerHTML = data.main.humidity + "%";
               document.getElementById("pressure").innerHTML = data.main.pressure;
               document.getElementById("wind").innerHTML = data.wind.speed + "Km/h";
               document.getElementById('city').innerHTML = data.name;

               const climate = ["Clouds","Clear","Drizzle","Rain","Snow","Mist"]
               let img = document.getElementById('img');
               let name = document.getElementById('name')
               if(data.weather[0].main == climate[0]){
                    img.src="images/clouds.png";

               }
               else if(data.weather[0].main == climate[1]){
                    img.src="images/clear.png";

               }
               else if(data.weather[0].main == climate[2]){
                    img.src="images/drizzle.png";

               }
               else if(data.weather[0].main == climate[3]){
                    img.src="images/rain.png";

               }
               else if(data.weather[0].main == climate[4]){
                    img.src="images/snow.png";

               }
               else if(data.weather[0].main == climate[5]){
                    img.src="images/mist.png";

               }
               if(data.weather[0].main == climate[0]){
                    name.innerHTML = 'Clouds';
               }
               else if(data.weather[0].main == climate[1]){
                    name.innerHTML = 'Clear';
               }
               else if(data.weather[0].main == climate[2]){
                    name.innerHTML = 'Drizzle';
               }
               else if(data.weather[0].main == climate[3]){
                    name.innerHTML = 'Rain';
               }
               else if(data.weather[0].main == climate[4]){
                    name.innerHTML = 'Snow';
               }
               else if(data.weather[0].main == climate[5]){
                    name.innerHTML = 'Mist';
               }








               

          }

     });
}
async function button(){
   const input = document.getElementById("input");
   const inputValue = input.value;
   const key="&appid=e0a9538e363bdc498c473dc6fe344cea&units=metric"
   const link = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputValue + key);
   data= await link.json();
   console.log(data)
   const climate = ["Clouds","Clear","Drizzle","Rain","Snow","Mist"]
   document.getElementById('city').innerHTML = data.name;
   document.getElementById("humidity").innerHTML = data.main.humidity + "%";
   document.getElementById("pressure").innerHTML = data.main.pressure;
   document.getElementById("wind").innerHTML = data.wind.speed + "Km/h";
   let img = document.getElementById('img');
   let name = document.getElementById('name')
               
   if(data.cod == '404'){
     city.innerHTML = "your city can't find";

   }
   else{
    
    if(data.weather[0].main == climate[0]){
     img.src="images/clouds.png";

     }
else if(data.weather[0].main == climate[1]){
     img.src="images/clear.png";

}
else if(data.weather[0].main == climate[2]){
     img.src="images/drizzle.png";

}
else if(data.weather[0].main == climate[3]){
     img.src="images/rain.png";

}
else if(data.weather[0].main == climate[4]){
     img.src="images/snow.png";

}
else if(data.weather[0].main == climate[5]){
     img.src="images/mist.png";

}
if(data.weather[0].main == climate[0]){
     name.innerHTML = 'Clouds';
}
else if(data.weather[0].main == climate[1]){
     name.innerHTML = 'Clear';
}
else if(data.weather[0].main == climate[2]){
     name.innerHTML = 'Drizzle';
}
else if(data.weather[0].main == climate[3]){
     name.innerHTML = 'Rain';
}
else if(data.weather[0].main == climate[4]){
     name.innerHTML = 'Snow';
}
else if(data.weather[0].main == climate[5]){
     name.innerHTML = 'Mist';
}


}}

     
     
          
     
     


     

     

