const time = document.getElementById("time")
const date = document.getElementById("date")
const icon = document.getElementById("plus")
const inputbox = document.getElementById("searchbox");
alert("turn on your location")
function menu(){
     if (icon.classList.contains('rotate-0')) {
          icon.classList.remove('rotate-0');
          icon.classList.add('rotate-43');
      } else if (icon.classList.contains('rotate-43')) {
          icon.classList.remove('rotate-43');
      } else {
          icon.classList.add('rotate-43');
      }
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

               const climate = ["Clouds","Clear","Drizzle","Rain","Snow","Mist","Haze"]
               let img = document.getElementById('img');
               let name = document.getElementById('name')
               if(data.weather[0].main == climate[0]){
                    img.src="images/clouds.png";
                    name.innerHTML = 'Clouds';
                    document.body.style.backgroundImage = "url('bg/cloudbg.jpg')";
                    
          
          
               }
               else if(data.weather[0].main == climate[1]){
                    img.src="images/clear.png";
                    name.innerHTML = 'Clear';
                    document.body.style.backgroundImage = "url('bg/clearbg.jpg')";
          
          
               }
               else if(data.weather[0].main == climate[2]){
                    img.src="images/drizzle.png";
                    name.innerHTML = 'Drizzle';
                    document.body.style.backgroundImage = "url('bg/drizzlebg.jpg')";
               
          
               }
               else if(data.weather[0].main == climate[3]){
                    img.src="images/rain.png";
                    name.innerHTML = 'Rain';
                    document.body.style.backgroundImage = "url('bg/rainbg.jpg')";
                    
                    
          
               }
               else if(data.weather[0].main == climate[4]){
                    img.src="images/snow.png";
                    name.innerHTML = 'Snow';
                    document.body.style.backgroundImage = "url('bg/snow.jpg')";
          
               }
               else if(data.weather[0].main == climate[5] || data.weather[0].main == climate[6] ){
                    img.src="images/mist.png";
                    name.innerHTML = 'Mist';
                    document.body.style.backgroundImage = "url('bg/mist.jpg')";
          
               }
                    

          }

     });
}
async function button(){
   const climate = ["Clouds","Clear","Drizzle","Rain","Snow","Mist"]
  
   let img = document.getElementById('img');
   let name = document.getElementById('name')  
   const input = document.getElementById("input");
   const inputValue = input.value;
   const key="&appid=e0a9538e363bdc498c473dc6fe344cea&units=metric"
   const link = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputValue + key);
   let data= await link.json();
   if(data.cod == 404){
     console.log(data.cod)
     city.innerHTML = "Your city can't find";
     

   }
   else{
     if(data.weather[0].main == climate[0]){
          img.src="images/clouds.png";
          name.innerHTML = 'Clouds';
          document.body.style.backgroundImage = "url('bg/cloudbg.jpg')";
          


     }
     else if(data.weather[0].main == climate[1]){
          img.src="images/clear.png";
          name.innerHTML = 'Clear';
          document.body.style.backgroundImage = "url('bg/clearbg.jpg')";


     }
     else if(data.weather[0].main == climate[2]){
          img.src="images/drizzle.png";
          name.innerHTML = 'Drizzle';
          document.body.style.backgroundImage = "url('bg/drizzlebg.jpg')";
     

     }
     else if(data.weather[0].main == climate[3]){
          img.src="images/rain.png";
          name.innerHTML = 'Rain';
          document.body.style.backgroundImage = "url('bg/rainbg.jpg')";
          
          

     }
     else if(data.weather[0].main == climate[4]){
          img.src="images/snow.png";
          name.innerHTML = 'Snow';
          document.body.style.backgroundImage = "url('bg/snow.jpg')";

     }
     else if(data.weather[0].main == climate[5] || data.weather[0].main == climate[6] ){
          img.src="images/mist.png";
          name.innerHTML = 'Mist';
          document.body.style.backgroundImage = "url('bg/mist.jpg')";

     }
    

   }
document.getElementById('city').innerHTML = data.name;
document.getElementById("humidity").innerHTML = data.main.humidity + "%";
document.getElementById("pressure").innerHTML = data.main.pressure;
document.getElementById("wind").innerHTML = data.wind.speed + "Km/h";
}
     
     
          
     
     


     

     

