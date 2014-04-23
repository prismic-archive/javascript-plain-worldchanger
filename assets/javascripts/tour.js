$(function(){

    Prismic.Api(urlAPI, function(err, api){

        getDocById(api.bookmarks['homepage'], function(err1, home) {
            getDocById(api.bookmarks['tour'], function(err2, tour) {
                getArgs(function(err3, args) {
                    getMinPrice(function(err4, minPrice) {
                        var source = $('body').find('script[type="text/template"]').html();
                        var template = source ? tmpl(source) : undefined;
                        
                        infos = {
                            home: home,
                            tour: tour,
                            args: args,
                            minPrice: minPrice,
                            ctx: CTX
                        }
                        console.log(tour);
                        if(template) {
                            $('#tour').html(template(infos));
                        }
                    });
                });
            });
        });

    });

});