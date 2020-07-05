var titleData = {
    0: ["The", "A New", "The Last"],
    1: ["Revenge", "Hope", "Force", "Sith", "Skywalker", "Jedi", "Emperor", "Return"],
    2: ["Rise", "Return", "Awaken", "Strike", "Attack"],
    3: ["of the"],
}

var titleOrders = [
    [0, 1, 3, 2],
    [0, 2, 3, 2],
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

function getCrawlText(epNumber,title) {

    var crawl = '<div class="fade"></div><section class="star-wars"> <div class="crawl"> <div class="title"> <p>Episode ' + epNumber + '</p><h1>' + title + '</h1> </div><p>It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.</p><p>During the battle, Rebel spies managed to steal secret plans to the Empire\'s ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.</p><p>Pursued by the Empire\'s sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy ...</p></div></section></body>';

    return crawl;


}

function generate() {
    play();
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

    $('#top_area').css({'background-color': '#000'}); 
    $('.star-wars,.fade,#arrow').remove();
    $('#gen_button').css({'font-size': '14px'});
    $('body').append(getCrawlText(epNumber,text));
    $('#gen_button').text("Generate New Movie");


}


function play() {
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