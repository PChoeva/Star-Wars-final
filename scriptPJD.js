//Yuliyan
$(document).ready(function () {
    $('.carousel .carousel-caption').css('zoom', $('.carousel').width() / 1250);
});

$(window).resize(function () {
    $('.carousel .carousel-caption').css('zoom', $('.carousel').width() / 1250);
});

let movies = '';
$.ajax('https://star-wars-334ba.firebaseio.com/movies.json', {
    method: 'GET',

    success: function (response) {

        attachMovies(response);

        function attachMovies(movies) {
            console.log(response);

            $('.movie-button').click(function (e) {
                e.preventDefault();

                let check = $(this).text();


                $(".title").hide();
                $(".carousel").hide();


                let movieInfo = '';
                for (let name in response) {

                    movieInfo = response[check];
                }

                let movieContent = movieInfo['content'];

                console.log(movieContent);

                let h1Title = $('<h1>' + movieInfo['name'] + '<h1>').addClass('movie-title');

                let divRow = $('<div>').addClass('row');
                let aboutDiv = $('<div class="heading">About</div>');

                let divInfo = $('<div>').addClass('info-movie');
                let paraInfo = $('<p>  ' + movieContent + '</p>').addClass('movie-info');


                let divImageCover = $('<div>').addClass('img-movie');
                let imageCover = $('<img class="img-responsive" width="500" height="600">').attr("src", 'renderAll_images/movies/' + check + '.png');

                let returnButton = $('<button>Return</button>').addClass('return');

                $("main")
                    .append(h1Title)
                    .append(divRow);

                (divRow)
                    .append(aboutDiv)
                    .append(divInfo
                        .append(paraInfo)
                        .append(returnButton))
                    .append(divImageCover
                        .append(imageCover));

                returnAndDelete();

                function returnAndDelete() {
                    $('.return').click(function (e) {
                        e.preventDefault();

                        $('.movie-title').remove();
                        $(divRow).remove();
                        $('.col-md-8').empty();
                        $('.col-md-4').remove();

                        $(".title").show();
                        $(".carousel").show();

                    });
                }
            });
        }
    }
});

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

attachDataEvents();

//---Petya-------------------------------------------------------------------------------------------------

//Render single character
function obtainCharacterData(name) {
    $
        .get('https://star-wars-334ba.firebaseio.com/characters/' + name + '.json')
        .then(renderCharacterData)
        .catch(function (error)  { console.log(error) });

}



function renderCharacterData(character) {

    let containter = $('<div>');

    let headNameDiv = $('<div>');
    headNameDiv.addClass('head-name col-lg-8 offset-lg-2');
    headNameDiv.text(character['name'].toLowerCase());
    headNameDiv.css('cursor','pointer');
    containter.append(headNameDiv);

    // let headSayDiv = $('<div>');
    // headSayDiv.addClass('head-say col-lg-8 offset-lg-2');
    // headSayDiv.text('I`M LUKE SKYWALKER. IM HERE TO RESCUE YOU." - A NEW HOPE');
    // containter.append(headSayDiv);

    //section 1
    let section1Div = $('<div>');
    section1Div.addClass('section col-lg-8 offset-lg-2');
    let section1HeadDiv = $('<div>');
    section1HeadDiv.addClass('section-head');
    section1HeadDiv.text('About');
    //section 1 row
    let row1Div = $('<div>');
    row1Div.addClass('row');
    let infoPicDiv = $('<div>');
    infoPicDiv.addClass('info-pic col-lg-6 col-md-12');
    let image = $('<img src="images/characters/' + character['name'].toLowerCase() + '/' + character['name'].toLowerCase() + '-info.jpg">');
    infoPicDiv.append(image);
    let infoTextDiv = $('<div>');
    infoTextDiv.addClass('info-text col-lg-6 col-md-12');
    let pDiv = $('<p>');
    pDiv.text(character['description']);
    infoTextDiv.append(pDiv);
    section1Div.append(section1HeadDiv);

    row1Div
        .append(infoPicDiv)
        .append(infoTextDiv);
    section1Div.append(row1Div);

    //section 2
    let section2Div = $('<div>');
    section2Div.addClass('section col-lg-8 offset-lg-2');

    let section2HeadDiv = $('<div>');
    section2HeadDiv.addClass('section-head');
    section2HeadDiv.text('Information');

    let row2Div = $('<div>');
    row2Div.addClass('row');
//section 2 info 1
    let section2Info1 = $('<div>');
    section2Info1.addClass('info col-lg-6 col-md-12');

    let section2Ul1 = $('<ul>');
    let liSpecies = $('<li> <span>species</span> : ' + character['species'] + '</li>');
    let liGender = $('<li> <span>Gender</span> : ' + character['gender'] + '</li>');
    let liHeight = $('<li> <span>Height</span> : ' + character['height'] + '</li>');
    let liAffiliations = $('<li> <span>Affiliations</span> : ' + character['affiliations'] + '</li>');
    let liAppearances = $('<li> <span>Appearances</span> : ' + character['appearances'] + '</li>');
    section2Ul1
        .append(liSpecies)
        .append(liGender)
        .append(liHeight)
        .append(liAffiliations)
        .append(liAppearances);

    section2Info1.append(section2Ul1);



    //section 2 info 2

    let section2Info2 = $('<div>');
    section2Info2.addClass('info col-lg-6 col-md-12');
    let section2Ul2 = $('<ul>');
    let liLocations = $('<li> <span>Locations</span> : ' + character['locations'] + '</li>');
    let liTool = $('<li> <span>Tool</span> : ' + character['tool'] + '</li>');
    let liVehicles = $('<li> <span>Vehicles</span> : ' + character['vehicles'] + '</li>');
    let liWeapons = $('<li> <span>Weapons</span> : ' + character['weapons'] + '</li>');
    section2Ul2
        .append(liLocations)
        .append(liTool)
        .append(liVehicles)
        .append(liWeapons);

    section2Info2.append(section2Ul2);


    row2Div
        .append(section2Info1)
        .append(section2Info2);


    section2Div
        .append(section2HeadDiv)
        .append(row2Div);


    //section 3 gallery

    let section3Div = $('<div>');
    section3Div.addClass('section col-lg-8 offset-lg-2');
    let section3Head = $('<div class="section-head">Gallery</div>');
    let section3Row = $('<div>');
    section3Row.addClass('row');
    let picDiv1 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/characters/' + character['name'].toLowerCase() + '/' + character['name'].toLowerCase() + '-gallery-1.jpg"> </div>');
    let picDiv2 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/characters/' + character['name'].toLowerCase() + '/' + character['name'].toLowerCase() + '-gallery-2.jpg"> </div>');
    let picDiv3 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/characters/' + character['name'].toLowerCase() + '/' + character['name'].toLowerCase() + '-gallery-3.jpg"> </div>');
    let picDiv4 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/characters/' + character['name'].toLowerCase() + '/' + character['name'].toLowerCase() + '-gallery-4.jpg"> </div>');
    section3Row
        .append(picDiv1)
        .append(picDiv2)
        .append(picDiv3)
        .append(picDiv4);
    section3Div
        .append(section3Head)
        .append(section3Row);



    $('.container-content')
        .append(headNameDiv)
        // .append(headSayDiv)
        .append(section1Div)
        .append(section2Div)
        .append(section3Div);

    $('main')
        .css('background', 'url("images/characters/' + character['name'].toLowerCase() + '/' + character['name'].toLowerCase() + '-photo.png")top center no-repeat');
    $('body')
        .css('background','none')
        .css('background-color','black');


}




//Render Single Planet

function obtainPlanetData(name) {
    $
        .get('https://star-wars-334ba.firebaseio.com/planets/' + name + '.json')
        .then(renderPlanetData)
        .catch(function (error)  { console.log(error) });

}



function renderPlanetData(planet) {

    let containter = $('<div>');

    let headNameDiv = $('<div>');
    headNameDiv.addClass('head-name col-lg-8 offset-lg-2');
    headNameDiv.text(planet['name']);
    headNameDiv.css('cursor','pointer');
    containter.append(headNameDiv);

//section 1
    let section1Div = $('<div>');
    section1Div.addClass('section col-lg-8 offset-lg-2');
    let section1HeadDiv = $('<div>');
    section1HeadDiv.addClass('section-head');
    section1HeadDiv.text('About');
    let row1Div = $('<div>');
    row1Div.addClass('row');
    let infoPicDiv = $('<div>');
    infoPicDiv.addClass('info-pic col-lg-6 col-md-12');
    let image = $('<img src="images/planets/' + planet['name'].toLowerCase() + '/' + planet['name'].toLowerCase() + '-info.jpg">');
    infoPicDiv.append(image);
    let infoTextDiv = $('<div>');
    infoTextDiv.addClass('info-text col-lg-6 col-md-12');
    let pDiv = $('<p>');
    pDiv.text(planet['description']);
    infoTextDiv.append(pDiv);
    section1Div.append(section1HeadDiv);
    row1Div
        .append(infoPicDiv)
        .append(infoTextDiv);
    section1Div.append(row1Div);



    let section2Div = $('<div>');
    section2Div.addClass('section col-lg-8 offset-lg-2');
    let section2HeadDiv = $('<div>');
    section2HeadDiv.addClass('section-head');
    section2HeadDiv.text('Information');
    let row2Div = $('<div>');
    row2Div.addClass('row');
//section 2 info 1
    let section2Info1 = $('<div>');
    section2Info1.addClass('info col-lg-6 col-md-12');
    let section2Ul1 = $('<ul>');
    let liRegion = $('<li> <span>Region</span> : ' + planet['region'] + '</li>');
    let liSector = $('<li> <span>Sector</span> : ' + planet['sector'] + '</li>');
    let liSystem = $('<li> <span>System</span> : ' + planet['system'] + '</li>');
    let liInhabitants = $('<li> <span>Inhabitants</span> : ' + planet['inhabitants'] + '</li>');
    let liCapital = $('<li> <span>Capital City</span> : ' + planet['capital'] + '</li>');
    section2Ul1
        .append(liRegion)
        .append(liSector)
        .append(liSystem)
        .append(liInhabitants)
        .append(liCapital);

    section2Info1.append(section2Ul1);
    row2Div.append(section2Info1);



    //section 2 info 2

    let section2Info2 = $('<div>');
    section2Info2.addClass('info col-lg-6 col-md-12');
    let section2Ul2 = $('<ul>');
    let liSize = $('<li> <span>Size</span> : ' + planet['size'] + '</li>');
    let liPopulation = $('<li> <span>Population</span> : ' + planet['population'] + '</li>');
    let liOrbitalPeriod = $('<li> <span>Orbital Period</span> : ' + planet['orbital_period'] + '</li>');
    let liRotationPeriod = $('<li> <span>Rotation period</span> : ' + planet['rotation_period'] + '</li>');
    let liClimate = $('<li> <span>Climate</span> : ' + planet['climate'] + '</li>');
    let liTerrain = $('<li> <span>Terrain</span> : ' + planet['terrain'] + '</li>');
    section2Ul2
        .append(liSize)
        .append(liPopulation)
        .append(liOrbitalPeriod)
        .append(liRotationPeriod)
        .append(liClimate)
        .append(liTerrain);

    section2Info2.append(section2Ul2);
    row2Div.append(section2Info2);

    section2Div
        .append(section2HeadDiv)
        .append(row2Div);


    // section 3 gallery

    let section3Div = $('<div>');
    section3Div.addClass('section col-lg-8 offset-lg-2');
    let section3Head = $('<div class="section-head">Gallery</div>');
    let section3Row = $('<div>');
    section3Row.addClass('row');
    let picDiv1 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/planets/' + planet['name'].toLowerCase() + '/' + planet['name'].toLowerCase() + '-gallery-1.jpg"> </div>');
    let picDiv2 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/planets/' + planet['name'].toLowerCase() + '/' + planet['name'].toLowerCase() + '-gallery-2.jpg"> </div>');
    let picDiv3 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/planets/' + planet['name'].toLowerCase() + '/' + planet['name'].toLowerCase() + '-gallery-3.jpg"> </div>');
    let picDiv4 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/planets/' + planet['name'].toLowerCase() + '/' + planet['name'].toLowerCase() + '-gallery-4.jpg"> </div>');
    section3Row
        .append(picDiv1)
        .append(picDiv2)
        .append(picDiv3)
        .append(picDiv4);
    section3Div
        .append(section3Head)
        .append(section3Row);



    $('.container-content')
        .append(headNameDiv)
        .append(section1Div)
        .append(section2Div)
        .append(section3Div);
    $('main')
        .css('background', 'url("images/planets/' + planet['name'].toLowerCase() + '/' + planet['name'].toLowerCase() + '-photo.png")top center no-repeat');
    $('body')
        .css('background','none')
        .css('background-color','black');

}





//Render Single spaceship

function obtainSpaceshipData(name) {
    $
        .get('https://star-wars-334ba.firebaseio.com/spaceships/' + name + '.json')
        .then(renderSpaceshipData)
        .catch(function (error)  { console.log(error) });

}



function renderSpaceshipData(spaceship) {

    let containter = $('<div>');

    let headNameDiv = $('<div>');
    headNameDiv.addClass('head-name col-lg-8 offset-lg-2');
    headNameDiv.text(spaceship['name'].toLowerCase());
    headNameDiv.css('cursor','pointer');
    containter.append(headNameDiv);

//section 1
    let section1Div = $('<div>');
    section1Div.addClass('section col-lg-8 offset-lg-2');
    let section1HeadDiv = $('<div>');
    section1HeadDiv.addClass('section-head');
    section1HeadDiv.text('About');
    let row1Div = $('<div>');
    row1Div.addClass('row');
    let infoPicDiv = $('<div>');
    infoPicDiv.addClass('info-pic col-lg-6 col-md-12');
    let image = $('<img src="images/spaceships/' + spaceship['name'].toLowerCase() + '/' + spaceship['name'].toLowerCase() + '-info.jpg">');
    infoPicDiv.append(image);
    let infoTextDiv = $('<div>');
    infoTextDiv.addClass('info-text col-lg-6 col-md-12');
    let pDiv = $('<p>');
    pDiv.text(spaceship['description']);
    infoTextDiv.append(pDiv);
    section1Div.append(section1HeadDiv);
    row1Div
        .append(infoPicDiv)
        .append(infoTextDiv);
    section1Div.append(row1Div);



    let section2Div = $('<div>');
    section2Div.addClass('section col-lg-8 offset-lg-2');
    let section2HeadDiv = $('<div>');
    section2HeadDiv.addClass('section-head');
    section2HeadDiv.text('Information');
    let row2Div = $('<div>');
    row2Div.addClass('row');
//section 2 info 1
    let section2Info1 = $('<div>');
    section2Info1.addClass('info col-lg-6 col-md-12');
    let section2Ul1 = $('<ul>');
    let liRegion = $('<li> <span>First appearance</span> : ' + spaceship['first_appearance'] + '</li>');

    section2Ul1.append(liRegion);

    section2Info1.append(section2Ul1);
    row2Div.append(section2Info1);


    section2Div
        .append(section2HeadDiv)
        .append(row2Div);


    // section 3 gallery

    let section3Div = $('<div>');
    section3Div.addClass('section col-lg-8 offset-lg-2');
    let section3Head = $('<div class="section-head">Gallery</div>');
    let section3Row = $('<div>');
    section3Row.addClass('row');
    let picDiv1 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/spaceships/' + spaceship['name'].toLowerCase() + '/' + spaceship['name'].toLowerCase() + '-gallery-1.jpg"> </div>');
    let picDiv2 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/spaceships/' + spaceship['name'].toLowerCase() + '/' + spaceship['name'].toLowerCase() + '-gallery-2.jpg"> </div>');
    let picDiv3 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/spaceships/' + spaceship['name'].toLowerCase() + '/' + spaceship['name'].toLowerCase() + '-gallery-3.jpg"> </div>');
    let picDiv4 = $('<div class="gall-pic col-lg-6 col-md-12"><img src="images/spaceships/' + spaceship['name'].toLowerCase() + '/' + spaceship['name'].toLowerCase() + '-gallery-4.jpg"> </div>');
    section3Row
        .append(picDiv1)
        .append(picDiv2)
        .append(picDiv3)
        .append(picDiv4);
    section3Div
        .append(section3Head)
        .append(section3Row);



    $('.container-content')
        .append(headNameDiv)
        .append(section1Div)
        .append(section2Div)
        .append(section3Div);

    $('main')
        .css('background', 'url("images/spaceships/' + spaceship['name'].toLowerCase() + '/' + spaceship['name'].toLowerCase() + '-photo.png")top center no-repeat');
    $('body')
        .css('background','none')
        .css('background-color','black');

}


//---Georgi------------------------------------------------------------

// render all data

//take firebase information
let curr_item;
function contentItemData(item){
    curr_item=item;

    let requestURL = 'https://star-wars-334ba.firebaseio.com/' + item + '.json';
    $.ajax({
        url:requestURL,
        success:renderItemData
    });
}

// render all data from an item (ex. all planets with a name and pic)
function renderItemData(content){
    console.log("render characters:" + curr_item);
    let sectionContent = $('<section class="wrapper row">');
console.log(content);
    $('.container-content')
        .append($('<h1 id="heading-data">'+ curr_item +'</h1>'))
        .append(sectionContent);

    for(let key in content){
        let itemSingleData = content[key];
        renderItemSingleData(itemSingleData);

    }
}
// render name and pic of a single data
function renderItemSingleData(singleData){
    let name = singleData['name'];

    let containerDiv = $('<div class="characters col-sm-6 col-md-4 col-lg-3">');
    let img = $('<img src="renderAll_images/' + curr_item +'/' + name + '.png" alt="">');
    let contentName = $('<h3 class="name">' + name + '</h3>');

    containerDiv
        .append(img)
        .append(contentName);

    containerDiv
        .appendTo($('.wrapper'));
}

function attachEvents() {
    $('.container-content').on('click','.characters',function () {

        $('.container-content').empty();


        if(curr_item === 'characters'){
            obtainCharacterData($(this).find('.name').text());
        }
        if(curr_item === 'planets'){
            obtainPlanetData($(this).find('.name').text());
        }
        if(curr_item === 'spaceships'){
            obtainSpaceshipData($(this).find('.name').text());
        }



    })
}

//single item data
function attachBackClickEvent() {
    $('.container-content').on('click','.head-name',function () {

        returnToIndexBackground();
        $('.container-content').empty();
        contentItemData(curr_item);
    })
}

// attachDataEvents();
attachEvents();
attachBackClickEvent();
// obtainSpaceshipData('X-Wing');

// obtainPlanetData('Bespin');

// obtainCharacterData('R2-D2');