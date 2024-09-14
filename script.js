const socket = io();
if (navigator.geolocation){
    navigator.geolocation.watchPosition((position) =>{
        const{latitude ,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude})
    },
(error)=>{console.error(error);

},
{
    enableHighAccuracy:true,
    timeout:5000,
    maximumAge:0,
}
)
}
const map=L.map("map").setView([0,0],10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"ankit"
}).addTo(map);

const markers ={};

socket.on("receive-location",(data)=>{
    const{id,latitude,longitude}=data;
    map.setView([latitude,longitude],18);
    if (markers[id]){
        markers[id].setLatLng([latitude,longitude])
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
})

socket.on("user-disconnected",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id])
            delete markers[id];
        
    }
}
)

const videoElement = document.getElementById('webcam');
const startButton = document.getElementById('startButton');

window.addEventListener("load", () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio:true
        })
        .then((stream) => {
            videoElement.srcObject = stream;
            })}
        })
