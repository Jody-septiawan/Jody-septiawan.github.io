function searchMovie() {
    $('#movie-list').html('');
    $.ajax({
        url: 'http://omdbapi.com', //alamat
        type: 'get', //methode
        dataType: 'json', //return value
        data: {
            'apikey': 'a3c8501a',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;
                $('#hasil').html(`<p>` + result.totalResults + ` pencarian</p>`);
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3 shadow border-primary" style="width: 18rem;">
                                <img src="`+ data.Poster + `" style="height: 400px; width: 18rem" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">`+ data.Title + `</h5>
                                <p class="card-text"><small class="text-muted">`+ data.Year + `</small></p>
                                <a href="#" class="btn btn-primary">Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
                $('#search-input').val('');
            } else {
                $('#movie-list').html(`
                <div class="col">
                <h1 class="text-center text-danger">`+ result.Error + `</h1>
                </div>
                `);
            }
        }
    });
}

$('#search-button').on('click', function () {
    searchMovie();
});

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        searchMovie();
    }
});
