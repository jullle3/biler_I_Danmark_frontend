function change_visibility(){
    var x = document.getElementById("table_audi")

    console.log(x.style.visibility)
    if (x.style.visibility === "hidden") {
        x.style.visibility = "visible"
    } else {
        x.style.visibility = "hidden"
    }
}


var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText); // henter teksten og parser til JSON objekt
        document.getElementById("demo").innerHTML = myObj.name;
    }
};
xmlhttp.open("GET", "https://biler-i-danmark-api.appspot.com/cars.json", true);
xmlhttp.send();
