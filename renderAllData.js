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
    let img = $('<img src="renderAll_images/' + curr_item +'/' + name+ '.png" alt="">');
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


attachBackClickEvent();