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
        let car_brands = [
            "Audi", "BMW", "Citroen", "Fiat", "Ford", "Honda", "Hyundai", "Kia", "Mazda", "Mercedes",
            "Mitsubishi", "Mini", "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Seat", "Skoda", "Suzuki",
            "Toyota", "Volkswagen", "Volvo"
        ];

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
            "table-mitsubishi",
            "table-mini",
            "table-nissan",
            "table-opel",
            "table-peugeot",
            "table-porsche",
            "table-renault",
            "table-seat",
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
                let id = data["cars"][car_brands[i]][j]["_id"];

                if (price === 0){
                    continue;
                }

                // prettify price
                price = price.toLocaleString()

//                ctx.setAttribute("hidden", "")


                let tr = table_ref.insertRow();  // row
                let td = tr.insertCell(0);  // celle på idx 0
                let td2 = tr.insertCell(1);  // celle på idx 1

                // Graf
                var showGraph = new Boolean(false)

                td2.addEventListener("click", function() {
                    td2.innerHTML = ''

                    if (showGraph) {
                        $.getJSON('https://biler-i-danmark-api.appspot.com/storage/get_price_changes?id=' + id).done(function(data) {
//                        $.getJSON('localhost:5000/storage/get_price_changes?id=' + id).done(function(data) {
                            console.log(data)

                            var ctx = document.createElement("canvas")
                            new Chart(ctx, {
                                type: 'line',
                                data: {
    //                                labels: ["2020-03-12", "2020-11-10 08:00:26", "2020-12-23 08:00:47"],
                                        labels: data["x-axis"],
                                    datasets: [{
                                        label: "Prishistorik",
                                            data: data["y-axis"],
//                                        data: [431145, 360683, 531100],
                                        borderColor: "rgb(72, 200, 106)",
                                        //backgroundColor:"rgb(72, 200, 106)",
                                        fill: true
                                    }]
                                },
                                options: {
                                    legend: {
                                        display: false
                                    },
                                    tooltips: {
                                        enabled: false
                                    },
                                    scales: {
                                        xAxes: [{
                                            ticks: {
                                                autoSkip: false
                                            }
                                        }]
                                    },
    //                                responsive: true,
    //                                maintainAspectRatio: false,
                                }
                            });

                            ctx.setAttribute("style", "display: block; height: 80px; width: 140px;")
                            ctx.setAttribute("id", id)

        //                    text2.setAttribute("hidden", "")
                            td2.appendChild(ctx);  // -||-
                        })


                    } else {
                        td2.appendChild(text2);
                    }
                    showGraph = !showGraph
                })


                let text = document.createTextNode(model);  // text til celle på idx 0
                let text2 = document.createTextNode(price)

                td.appendChild(text);  // tilføjer teksten til cellen
                td2.appendChild(text2);  // -||-


//             tmp
//            break
            }
            // tmp
//            break
        }

        let d = new Date(data["last_updated"])
        document.getElementById("nyeste_prisændring").innerText = "Nyeste prisændring: " + d.toLocaleDateString()
        document.getElementById("car_count").innerText = data["total"] + " biler"
        console.log("changed text")
    })
});
