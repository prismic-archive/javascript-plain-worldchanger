$(function(){

    function getFriendlyArgs(ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("arguments")
            .query('[[:d = at(document.tags, ["userfriendly"])][:d = at(document.tags, ["featured"])]]')
            .orderings("[my.argument.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                if(err) {
                    dfd.reject(err);
                } else {
                    dfd.resolve(docs.results);
                }
            });
        return dfd.promise();
    }

    function getDesignArgs(ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("arguments")
            .query('[[:d = at(document.tags, ["design"])][:d = at(document.tags, ["featured"])]]')
            .orderings("[my.argument.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                if(err) {
                    dfd.reject(err);
                } else {
                    dfd.resolve(docs.results);
                }
            });
        return dfd.promise();
    }

    function getQuestions(ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("questions")
            .query('[[:d = at(document.tags, ["featured"])]]')
            .orderings("[my.faq.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                if(err) {
                    dfd.reject(err);
                } else {
                    dfd.resolve(docs.results);
                }
            });
        return dfd.promise();
    }

    function getMinPrice(ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("plans")
            .query('[[:d = at(document.type, "pricing")]]')
            .orderings("[my.pricing.price]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                if(err) {
                    dfd.reject(err);
                } else {
                    dfd.resolve(docs.results[0].getNumber('pricing.price'));
                }
            });
        return dfd.promise();
    }

    Common.getCtx().then(function(ctx) {

        $.when(Common.getBookmark('homepage', ctx),
                getFriendlyArgs(ctx),
                getDesignArgs(ctx),
                getQuestions(ctx),
                getMinPrice(ctx)
            ).then(function(home, friendlyArgs, designArgs, questions, minPrice) {

                var data = {
                    friendlyArgs: friendlyArgs,
                    designArgs: designArgs,
                    questions: questions,
                    home: home,
                    minPrice: minPrice,
                    ctx: ctx,
                    page: 'home'
                };

                Common.insertTmpl('#homepage', data);
                Common.insertTmplFromFile('#minimumplans', data, 'layout/minimumplans.tpl');
                Common.insertTmplFromFile('#faqaccordion', data, 'layout/faqaccordion.tpl');
                Common.insertTmplFromFile('#menu', data, 'layout/menu.tpl');
                Common.insertTmplFromFile('#refselect', data, 'layout/refselect.tpl');
                Common.insertTmplFromFile('#footer', data, 'layout/footer.tpl');

            }).fail(Common.handleError);
    }).fail(Common.handleError);
});