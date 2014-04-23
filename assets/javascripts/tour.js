$(function(){

    function getArgs(ctx, callback) {
        ctx.api.form("arguments")
            .orderings("[my.argument.priority desc]")
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
            Common.getDocById('tour', ctx, function(err2, tour) {
                getArgs(ctx, function(err3, args) {
                    getMinPrice(ctx, function(err4, minPrice) {

                        var source = $('body').find('script[type="text/template"]').html();
                        var template = source ? tmpl(source) : undefined;
                        
                        var infos = {
                            home: home,
                            tour: tour,
                            args: args,
                            minPrice: minPrice,
                            ctx: ctx
                        }
                        if(template) {
                            $('#tour').html(template(infos));
                        }
                    });
                });
            });
        });

    });

});