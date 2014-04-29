$(function(){

    function getFriendlyArgs(ctx, callback) {
        ctx.api.form("arguments")
            .query('[[:d = at(document.tags, ["userfriendly"])][:d = at(document.tags, ["featured"])]]')
            .orderings("[my.argument.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results);
            });
    }

    function getDesignArgs(ctx, callback) {
        ctx.api.form("arguments")
            .query('[[:d = at(document.tags, ["design"])][:d = at(document.tags, ["featured"])]]')
            .orderings("[my.argument.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results);
            });
    }

    function getQuestions(ctx, callback) {
        ctx.api.form("questions")
            .query('[[:d = at(document.tags, ["featured"])]]')
            .orderings("[my.faq.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results);
            });
    }

    function getMinPrice(ctx, callback) {
        ctx.api.form("plans")
            .query('[[:d = at(document.type, "pricing")]]')
            .orderings("[my.pricing.price]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results[0].getNumber('pricing.price'));
            });
    }

    Common.getCtx().then(function(ctx) {

        Common.getBookmark('homepage', ctx).then(function(home) {
            getFriendlyArgs(ctx, function(err, friendlyArgs) {
                getDesignArgs(ctx, function(err1, designArgs) {
                    getQuestions(ctx, function(err2, questions) {
                        getMinPrice(ctx, function(err3, minPrice) {

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
                            Common.insertTmplFromFile('#footer', data, 'layout/footer.tpl');
                        });
                    });
                });
            });
        });
    });
});