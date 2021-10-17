$(document).ready(function(){

    // Indsætter data i carousel
    $.getJSON('https://biler-i-danmark-api.appspot.com/storage/get_cars?sort=-1').done(function(data) {

        /* Indsætter data i tabel */
        let table_ref = document.getElementById("table-dyreste").getElementsByTagName('tbody')[0];

        for (let j = 0; j < data.length; j++){  // for hver model
            car = data[j]
            let brand = car["brand"];
            let model = car["model"];
            let price = car["price"];

            if (price === 0){
                continue;
            }

            // prettify price
            price = price.toLocaleString()

            let tr = table_ref.insertRow();  // row
            let td = tr.insertCell(0);  // celle på idx 0
            let td2 = tr.insertCell(1);  // celle på idx 1


            let text = document.createTextNode(brand + " - " + model);  // text til celle på idx 0
            let text2 = document.createTextNode(price);  // text til celle på idx 0

            td.appendChild(text);  // tilføjer teksten til cellen
            td2.appendChild(text2);  // -||-
        }
    })
});
