$(function(){

    function getQuestions(ctx, callback) {
        ctx.api.form("questions")
            .query('[[:d = at(document.tags, ["pricing"])]]')
            .orderings("[my.faq.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results)
            });
    }

    function getplans(ctx, callback) {
        ctx.api.form("plans")
            .orderings("[my.pricing.price]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results)
            });
    }

    Common.getCtx(function(err, ctx){

        Common.getDocById('pricing', ctx, function(err1, pricing) {
            getplans(ctx, function(err2, plans) {
                getQuestions(ctx, function(err3, questions) {

                    var infos = {
                        pricing: pricing,
                        plans: plans,
                        questions: questions,
                        ctx: ctx,
                        page: 'pricing'
                    }

                    Common.insertTmpl('#pricing',infos);
                    Common.insertTmplFromFile('#faqaccordion',infos,'layout/faqaccordion.tpl');
                    Common.insertTmplFromFile('#menu',infos,'layout/menu.tpl');
                    Common.insertTmplFromFile('#footer',infos,'layout/footer.tpl');

                });
            });
        });

    });

});