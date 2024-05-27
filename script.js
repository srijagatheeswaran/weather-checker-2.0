const time = document.getElementById("time")
const date = document.getElementById("date")
const icon = document.getElementById("plus")
const inputbox = document.getElementById("searchbox");
let city = document.getElementById('city');
let img = document.getElementById('img');
let name = document.getElementById('name')  
let input = document.getElementById("input");
// alert("turn on your location")
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
     

function getLocation(){
     navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
          if (result.state === 'denied') {
              alert("The location access was denied")
          } else {
               navigator.geolocation.getCurrentPosition((success)=>{
             
                    let lat = success.coords.latitude;
                    let long = success.coords.longitude;
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
      });
     }





     
async function button(){
   const climate = ["Clouds","Clear","Drizzle","Rain","Snow","Mist"]
   
   const inputValue = input.value;
   const key="&appid=e0a9538e363bdc498c473dc6fe344cea&units=metric"
   const link = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputValue + key);
   let data= await link.json();
   if(data.cod == 404){
     city.innerHTML = "City not found"; 
     document.body.style.backgroundImage = "url('bg/Hu7cO08-stormy-wallpaper.jpg')";  
     name.innerHTML = '';
     img.src="images/notimg.png";
     inputbox.classList.add('err')

     

   }
   else{
     inputbox.classList.remove('err')
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
     city.innerHTML = data.name;
     document.getElementById("humidity").innerHTML = data.main.humidity + "%";
     document.getElementById("pressure").innerHTML = data.main.pressure;
     document.getElementById("wind").innerHTML = data.wind.speed + "Km/h";
    

   }

}
const cityArr = [
     "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad",
     "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
     "Lucknow", "Kanpur", "Nagpur", "Visakhapatnam", "Indore",
     "Thane", "Bhopal", "Patna", "Vadodara", "Ghaziabad",
     "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut",
     "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar",
     "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad",
     "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior",
     "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota",
     "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad", "Mysore",
     "Tiruchirappalli", "Bareilly", "Aligarh", "Tiruppur", "Moradabad",
     "Jalandhar", "Bhubaneswar", "Salem", "Warangal", "Guntur",
     "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati",
     "Noida", "Jamshedpur", "Bhilai", "Cuttack", "Firozabad",
     "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur",
     "Asansol", "Rourkela", "Nanded", "Kolhapur", "Ajmer",
     "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni",
     "Siliguri", "Jhansi", "Ulhasnagar", "Jammu", "Sangli-Miraj & Kupwad",
     "Mangalore", "Erode", "Belgaum", "Kurnool", "Ambattur",
     "Rajahmundry", "Tirunelveli", "Malegaon", "Gaya", "Udaipur",
     "Maheshtala", "Davanagere", "Kozhikode", "Kurnool", "Ujjain",
     "Gulbarga", "Tirunelveli", "Bokaro Steel City", "Bellary", "Patiala",
     "South Dumdum", "Bhagalpur", "Panihati", "Latur", "Dhule",
     "Rohtak", "Korba", "Bhilwara", "Berhampur", "Muzaffarpur",
     "Ahmednagar", "Mathura", "Kollam", "Avadi", "Kadapa",
     "Kamarhati", "Bilaspur", "Shahjahanpur", "Bijapur", "Rampur",
     "Shimoga", "Chandrapur", "Junagadh", "Thrissur", "Alwar",
     "Bardhaman", "Kulti", "Nizamabad", "Parbhani", "Tumkur",
     "Khammam", "Uzhavoor", "Tumakuru", "Ozhukarai", "Bihar Sharif",
     "Panipat", "Darbhanga", "Bally", "Aizawl", "Dewas",
     "Ichalkaranji", "Tirupati", "Karnal", "Bathinda", "Jalna",
     "Eluru", "Barasat", "Kirari Suleman Nagar", "Purnia", "Satna",
     "Mau", "Sonipat", "Farrukhabad", "Sagar", "Rourkela",
     "Durg", "Imphal", "Ratlam", "Hapur", "Arrah",
     "Karimnagar", "Anantapur", "Etawah", "Ambarnath", "North Dumdum",
     "Bharatpur", "Begusarai", "New Delhi", "Gandhinagar", "Bhatpara",
     "Bathinda", "Gopalpur", "Nalgonda", "Raiganj", "Shivpuri",
     "Bongaon", "Palghar", "Tonk", "Mandya", "Nagda",
     "Medinipur", "Haldwani", "Sikar", "Singrauli", "Kharagpur",
     "Karawal Nagar", "Nadiad", "Yamunanagar", "Maheshtala", "Wardha",
     "Dharmavaram", "Bhiwani", "Nagaon", "Budaun", "Hosur",
     "Palakkad", "Rajapalayam", "Bhadravati", "Hanumangarh", "Thanjavur",
     "Chengalpattu", "Faridabad", "Shivpuri", "Gangtok", "Khandwa",
     "Munger", "Bahraich", "Jorhat", "Alappuzha", "Saharsa",
     "Tenali", "Adoni", "Tadipatri", "Bhusawal", "Kanchipuram",
     "Namakkal", "Secunderabad", "Navi Mumbai", "Amravati", "Surendranagar Dudhrej",
     "Virar", "Kumbakonam", "Hisar", "Bharuch", "Vellore"
   ];
 let resultBox =document.querySelector('.suggestion');
input.onkeyup =function(){
     let result = [];
     let value = input.value;
     if(value.length){
          result = cityArr.filter((key)=>{
               return key.toLowerCase().includes(value.toLowerCase());
               
          })
          
     }
     display(result);


     
};
function display(result){
     let show = result.map((item)=>{
         return `<li onclick=select(this) class='sug'>${item}</li>`

     })
     resultBox.innerHTML = `<ul>${show.join('')}</ul>`

} 
function select(list){
     input.value = list.innerHTML;
     resultBox.innerHTML ='';
}
document.addEventListener("click",function(){
     resultBox.innerHTML ='';
})

document.addEventListener("keyup", function(event) {
     event.preventDefault();
     if (event.keyCode === 13) {
         document.getElementById("btn").click();
     }
 });
 let currentIndex =-1;
 input.addEventListener('keydown', (e) => {
     const suggestionItems = document.querySelectorAll('.sug');
     if (e.key === 'ArrowDown') {
         currentIndex = (currentIndex + 1) % suggestionItems.length;
         updateFocus(suggestionItems);
     } else if (e.key === 'ArrowUp') {
         currentIndex = (currentIndex - 1 + suggestionItems.length) % suggestionItems.length;
         updateFocus(suggestionItems);
     } else if (e.key === 'Enter' && currentIndex > -1) {
         e.preventDefault();
         suggestionItems[currentIndex].click();
         currentIndex = -1;
     }
 });
 function updateFocus(items) {
     items.forEach(item => item.classList.remove('focused'));
     if (items[currentIndex]) {
         items[currentIndex].classList.add('focused');
         items[currentIndex].scrollIntoView({
             block: 'nearest',
             inline: 'nearest'
         });
     }
 }
    
     
     


     

     

