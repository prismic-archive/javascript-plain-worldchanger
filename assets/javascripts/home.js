$(function(){
    
    function getFriendlyArgs(ctx, callback) {
        ctx.api.form("arguments")
            .query('[[:d = at(document.tags, ["userfriendly"])][:d = at(document.tags, ["featured"])]]')
            .orderings("[my.argument.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results)
            });
    }

    function getDesignArgs(ctx, callback) {
        ctx.api.form("arguments")
            .query('[[:d = at(document.tags, ["design"])][:d = at(document.tags, ["featured"])]]')
            .orderings("[my.argument.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results)
            });
    }

    function getQuestions(ctx, callback) {
        ctx.api.form("questions")
            .query('[[:d = at(document.tags, ["featured"])]]')
            .orderings("[my.faq.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results)
            });
    }

    function getMinPrice(ctx, callback) {
        ctx.api.form("plans")
            .query('[[:d = at(document.type, "pricing")]]')
            .orderings("[my.pricing.price]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results[0].getNumber('pricing.price'))
            });
    }

    Common.getCtx(function(err, ctx){

        Common.getDocById('homepage', ctx, function(err1, home) {
            getFriendlyArgs(ctx, function(err2, friendlyArgs) {
                getDesignArgs(ctx, function(err3, designArgs) {
                    getQuestions(ctx, function(err4, questions) {
                        getMinPrice(ctx, function(err5, minPrice) {
                            var source = $('body').find('script[type="text/template"]').html();
                            var template = source ? tmpl(source) : undefined;
                            
                            var infos = {
                                friendlyArgs: friendlyArgs,
                                designArgs: designArgs,
                                questions: questions,
                                home: home,
                                minPrice: minPrice,
                                ctx: ctx
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