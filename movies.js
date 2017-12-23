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