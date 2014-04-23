$(function(){

    Prismic.Api(urlAPI, function(err, api){

        getDocById(api.bookmarks['homepage'], function(err1, home) {
            getFriendlyArgs(function(err2, friendlyArgs) {
                getDesignArgs(function(err3, designArgs) {
                    getQuestions(function(err4, questions) {
                        getMinPrice(function(err5, minPrice) {
                            var source = $('body').find('script[type="text/template"]').html();
                            var template = source ? tmpl(source) : undefined;
                            
                            infos = {
                                friendlyArgs: friendlyArgs,
                                designArgs: designArgs,
                                questions: questions,
                                home: home,
                                minPrice: minPrice,
                                ctx: CTX
                            }
                            if(template) {
                                $('#homepage').html(template(infos));
                            }
                        });
                    });
                });
            });
        });

    });

});