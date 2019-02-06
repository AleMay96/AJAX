const connString=("https://jsonplaceholder.typicode.com/users/");

function loadDoc(connectionString,display_method) {
    var xhttp = new XMLHttpRequest();                             //APRIAMO IL DOCUMENTO PASSANDO DUE VARIABILI GENERICHE PER IMMAGAZZINARCI LA STRINGA DI CONNESSIONE E IL METODO DEL DISPLAY
    xhttp.onreadystatechange = display_method;
    xhttp.open("GET", connectionString , true);
    xhttp.send();
}

function display_data(evt){
  if (evt.target.readyState == 4 && evt.target.status == 200) { //CHECK DELL'AJAX
    var jsonObj = JSON.parse(evt.target.responseText);

    for(var i = 0; i<jsonObj.length; i++){                
      let paragraph = document.createElement('p');  //VIENE CREATO UN PARAGRAFO IN HTML
      paragraph.id = jsonObj[i].id;                 //VIENE ASSEGNATO UN ID AL PARAGRAFO IDENTICO ALL'ID DELL'OGGETTO CHE STIAMO LEGGENDO
      let link = document.createElement('a');       //VIENE CREATO UN TAG <a> IN HTML
      link.innerHTML = jsonObj[i].name;             //NEL TAG,VIENE ASSEGNATO IL name DI QUELL'OGGETTO
      link.setAttribute('href',jsonObj[i].name);    //GLI ASSEGNIAMO UN ATTRIBUTO HREF PER REFENZIARE SE STESSO
      paragraph.appendChild(link);                  //IL LINK PRENDE COME GENITORE PARAGRAPH
      document.getElementById('Info').appendChild(paragraph);
      link.thatConnString = connString + jsonObj[i].id;     //FACCIAMO SI CHE LINK ABBIA LA CONNSTRING E L'ID DI QUEL DETERMINATO OGGETTO
      link.onclick = load_details;                //SI INVOCA LA FUNZIONE load_details AL CLICK DI link
   }
  }
}

function interface_between_functions(){         
  loadDoc(connString, display_data)       //GLI VIENE PASSATA LA STRINGA DI CONNESSIONE E LA FUNZIONE display_data
}
 
function load_details(evt){                       //GLI VIENE PASSATO L'EVENTO
  loadDoc(evt.target.thatConnString, more_details);     //SI PRENDE QUELLA DETERMINATA FUNZIONE CON LA STRINGA DI CONNESSIONE E LA FUNZIONE more_details
  evt.preventDefault();
  return false;
}

function more_details(evt){
   if (evt.target.readyState == 4 && evt.target.status == 200) { 
     var jsonObj = JSON.parse(evt.target.responseText);
     let paragraph = document.getElementById(jsonObj.id);
     paragraph.innerHTML += "<br>The Username is: </br>"  + jsonObj.username;
     paragraph.innerHTML += "<br>The Email is: </br>"  + jsonObj.email; 
    //document.getElementById(jsonObj.id).appendChild(paragraph);
     }
}
  