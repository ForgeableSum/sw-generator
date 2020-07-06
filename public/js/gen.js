var titleData = {
    0: ["The", "A New", "The Last"],
    1: ["Revenge", "Hope", "Force", "Sith", "Skywalker", "Jedi", "Emperor", "Return"],
    2: ["Rise", "Return", "Strike", "Attack"],
    3: ["of the"],
}

var titleOrders = [
    [0, 1, 3, 2],
    [0, 2, 3, 1],
    [1, 3, 2],
    [2, 3, 1]
];



function integer_to_roman(num) {
    if (typeof num !== 'number')
        return false;

    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
        ],
        roman_num = "",
        i = 3;
    while (i--)
        roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
    return Array(+digits.join("") + 1).join("M") + roman_num;
}



function replaceCrawlText(epNumber,title) {
    var crawl = '<div class="fade"></div><section class="star-wars"> <div class="crawl"> <div class="title"> <p>Episode ' + epNumber + '</p><h1>' + title + '</h1> </div>';

    jQuery.get("/spin-text", function (data) {

        $('#top_area').css({'background-color': '#000'}); 
        $('.star-wars,.fade,#arrow,img#gen').remove();
        $('#gen_button').css({'font-size': '14px'});
        $('#gen_button').text("Generate New Movie");
        $('body').css({ 'background-image': 'url("/media/bg.jpg")' });

        crawl = crawl + data + '</div></section></body>'; 
        $('body').append(crawl);


    }); 

}

function generate() {
    playAudio();
    var rand = Math.floor(Math.random() * Object.keys(titleData).length);

    var order = titleOrders[rand];
    var text = '';
    for (var i = 0; i < order.length; i++) {
        var randWordIndex = Math.floor(Math.random() * titleData[order[i]].length);
        var word = titleData[order[i]][randWordIndex];
        text += word + ' ';

    }
    var epNumber = integer_to_roman(Math.floor((Math.random() + 10) * 100));

    var title = document.getElementById("title");
    title.innerHTML = 'Episode ' + epNumber + ': ' + text;

    replaceCrawlText(epNumber,text); 




}


function playAudio() {
    var audio = document.getElementById('song');
    audio.volume = 0.25;
    if (audio.paused) {
        audio.play();
    } else {
        audio.currentTime = 0
    }
}


$('#gen_button').on('click', function () {

    generate();


})