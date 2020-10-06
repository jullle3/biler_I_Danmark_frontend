// https://biler-i-danmark-api.appspot.com/storage/get_cars
//$.getJSON('http://localhost:5000/storage/get_cars', function(data) {
$(document).ready(function(){

    // Indsætter data i carousel
    $.getJSON('https://biler-i-danmark-api.appspot.com/storage/get_cars').done(function(data) {
        let i;
        let price_changes_len = data["Prisændringer"].length;
        let carousel_final_str;
        for (i = 0; i < price_changes_len; i++){
            if (i >= 10) break;  // max 10 carousel elementer

            let price_change_object = data["Prisændringer"][price_changes_len - (i + 1) ];  // -1 for at undgå off by one
            carousel_final_str = '<div class=\"carousel-item text-center\"> <p>' + price_change_object["Text"] + '</p> </div>';

            const div = document.createElement('div');
            div.className = 'carousel-item text-center';
            div.innerHTML = '<p>' + price_change_object["Text"] + '</p>';

            document.getElementById("carousel-inner-id").appendChild(div)

        }
        $('.carousel-item').first().addClass('active');
        $('#myCarousel').carousel();


        /* Indsætter data i tabellerne */
        let car_brands = ["Audi", "BMW", "Citroen", "Fiat", "Ford", "Mazda", "Mercedes", "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Toyota", "Volkswagen"];
        let tables = [
            "table-audi",
            "table-bmw",
            "table-citroen",
            "table-fiat",
            "table-ford",
            "table-mazda",
            "table-mercedes",
            "table-nissan",
            "table-opel",
            "table-peugeot",
            "table-porsche",
            "table-renault",
            "table-toyota",
            "table-volkswagen",
            ];


        for (i = 0; i < car_brands.length; i++) {  // for hvert bilmærke
            let table_ref = document.getElementById(tables[i]).getElementsByTagName('tbody')[0];

            for (let j = 0; j < data["Biler"][car_brands[i]].length; j++){  // for hver model
                let model = data["Biler"][car_brands[i]][j]["Model"];
                let price = data["Biler"][car_brands[i]][j]["Pris"];

                if (price === 0){
                    continue;
                }

                let tr = table_ref.insertRow();  // row
                let td = tr.insertCell(0);  // celle på idx 0
                let td2 = tr.insertCell(1);  // celle på idx 1


                let text = document.createTextNode(model);  // text til celle på idx 0
                let text2 = document.createTextNode(price);  // text til celle på idx 0

                td.appendChild(text);  // tilføjer teksten til cellen
                td2.appendChild(text2);  // -||-
            }
        }
    })
});
