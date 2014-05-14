$(function(){

    function getQuestions(ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("questions")
            .query('[[:d = at(document.tags, ["pricing"])]]')
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

    function getplans(ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("plans")
            .orderings("[my.pricing.price]")
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

    Common.getCtx().then(function(ctx) {

        $.when(Common.getBookmark('pricing', ctx),
                getplans(ctx),
                getQuestions(ctx)
            ).then(function(pricing, plans, questions) {

                var data = {
                    pricing: pricing,
                    plans: plans,
                    questions: questions,
                    ctx: ctx,
                    page: 'pricing'
                };

                Common.insertTmpl('#pricing', data);
                Common.insertTmplFromFile('#faqaccordion', data, 'layout/faqaccordion.tpl');
                Common.insertTmplFromFile('#menu', data, 'layout/menu.tpl');
                Common.insertTmplFromFile('#refselect', data, 'layout/refselect.tpl');
                Common.insertTmplFromFile('#footer', data, 'layout/footer.tpl');

            }).fail(Common.handleError); 
    }).fail(Common.handleError);
});