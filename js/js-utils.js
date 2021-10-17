// https://biler-i-danmark-api.appspot.com/storage/get_cars
//$.getJSON('http://localhost:5000/storage/get_cars', function(data) {
$(document).ready(function(){

    // Indsætter data i carousel
    $.getJSON('https://biler-i-danmark-api.appspot.com/storage/get_cars').done(function(data) {
        let i;
        let price_changes_len = data["price_changes"].length;
        let carousel_final_str;
        for (i = 0; i < price_changes_len; i++){
            if (i >= 10) break;  // max 10 carousel elementer

            let price_change_object = data["price_changes"][price_changes_len - (i + 1) ];  // -1 for at undgå off by one
            carousel_final_str = '<div class=\"carousel-item text-center\"> <p>' + price_change_object["text"] + '</p> </div>';

            const div = document.createElement('div');
            div.className = 'carousel-item text-center';
            div.innerHTML = '<p>' + price_change_object["text"] + '</p>';

            document.getElementById("carousel-inner-id").appendChild(div)

        }
        $('.carousel-item').first().addClass('active');
        $('#myCarousel').carousel();


        /* Indsætter data i tabellerne */
        let car_brands = ["Audi", "BMW", "Citroen", "Fiat", "Ford", "Honda", "Hyundai", "Kia", "Mazda", "Mercedes", "Mini", "Nissan", "Opel",
            "Peugeot", "Porsche", "Renault", "Skoda", "Suzuki", "Toyota", "Volkswagen", "Volvo"];
        let tables = [
            "table-audi",
            "table-bmw",
            "table-citroen",
            "table-fiat",
            "table-ford",
            "table-honda",
            "table-hyundai",
            "table-kia",
            "table-mazda",
            "table-mercedes",
            "table-mini",
            "table-nissan",
            "table-opel",
            "table-peugeot",
            "table-porsche",
            "table-renault",
            "table-skoda",
            "table-suzuki",
            "table-toyota",
            "table-volkswagen",
            "table-volvo",
            ];


        for (i = 0; i < car_brands.length; i++) {  // for hvert bilmærke
            let table_ref = document.getElementById(tables[i]).getElementsByTagName('tbody')[0];

            for (let j = 0; j < data["cars"][car_brands[i]].length; j++){  // for hver model
                let model = data["cars"][car_brands[i]][j]["model"];
                let price = data["cars"][car_brands[i]][j]["price"];

                if (price === 0){
                    continue;
                }

                // prettify price
                price = price.toLocaleString()

                let tr = table_ref.insertRow();  // row
                let td = tr.insertCell(0);  // celle på idx 0
                let td2 = tr.insertCell(1);  // celle på idx 1


                let text = document.createTextNode(model);  // text til celle på idx 0
                let text2 = document.createTextNode(price);  // text til celle på idx 0

                td.appendChild(text);  // tilføjer teksten til cellen
                td2.appendChild(text2);  // -||-
            }
        }

        let d = new Date(data["last_updated"])
        document.getElementById("nyeste_prisændring").innerText = "Nyeste prisændring: " + d.toLocaleDateString()
        document.getElementById("car_count").innerText = data["total"] + " biler"
        console.log("changed text")
    })
});
