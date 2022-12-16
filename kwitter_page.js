//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyAuWJI5O0Ea1LTzZNRfoksqom-Tmb_QsD0",
      authDomain: "kwitter-9e64e.firebaseapp.com",
      databaseURL: "https://kwitter-9e64e-default-rtdb.firebaseio.com",
      projectId: "kwitter-9e64e",
      storageBucket: "kwitter-9e64e.appspot.com",
      messagingSenderId: "917020292474",
      appId: "1:917020292474:web:0624bcb803cd9076ec92c3"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data["name"];
message = message_data["message"];
like = message_data["like"];
nameWithTag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>  Likes : " + like + "</span> </button> <hr>";
row = nameWithTag + messageWithTag + like_button + spanWithTag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function logout () {
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location = "index.html";
}

function send () {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name : user_name,
            message : msg,
            like : 0
      });
      document.getElementById("msg").value = "";
}

function updateLike (message_id) {
      console.log("clicked on the like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}