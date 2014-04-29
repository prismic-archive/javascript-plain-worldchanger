$(function(){

    function getQuestions(ctx, callback) {
        ctx.api.form("questions")
            .orderings("[my.faq.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results)
            });
    }

    Common.getCtx().then(function(ctx) {

        Common.getBookmark('faq', ctx).then(function(faq) {
            getQuestions(ctx, function(err, questions) {

                var infos = {
                    faq: faq,
                    questions: questions,
                    ctx: ctx,
                    page: 'faq'
                }

                Common.insertTmpl('#faq',infos);
                Common.insertTmplFromFile('#faqaccordion',infos,'layout/faqaccordion.tpl');
                Common.insertTmplFromFile('#menu',infos,'layout/menu.tpl');
                Common.insertTmplFromFile('#footer',infos,'layout/footer.tpl');

            });
        });

    });

});