//nav-item click event
function attachDataEvents() {
    $('.nav-link').on('click', function (e) {
        e.preventDefault();

        $(".title").hide();
        $(".carousel").hide();


        returnToIndexBackground();
        $('.container-content').empty();

        if($(this).text() === 'Home'){
            showHome();
        }else {
            contentItemData($(this).text().toLowerCase());
        }
        console.log('pressed button:' + $(this).text());

    });
}

function returnToIndexBackground(){
    $('main')
        .css('background', 'none');

    $('body')
        .css('background', 'url("renderAll_images/background_clear.jpg")cover no-repeat')
        .css('background', '');
}

function showHome() {
    returnToIndexBackground();
    $('.container-content').empty();
    $(".title").show();
    $(".carousel").show();
    console.log('show home');
}

attachEvents();

attachDataEvents();