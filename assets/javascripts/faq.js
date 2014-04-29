$(function(){

    function getQuestions(ctx, callback) {
        ctx.api.form("questions")
            .orderings("[my.faq.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results);
            });
    }

    Common.getCtx().then(function(ctx) {
        Common.getBookmark('faq', ctx).then(function(faq) {
            getQuestions(ctx, function(err, questions) {
                var data = {
                    faq: faq,
                    questions: questions,
                    ctx: ctx,
                    page: 'faq'
                };

                Common.insertTmpl('#faq',data);
                Common.insertTmplFromFile('#faqaccordion',data,'layout/faqaccordion.tpl');
                Common.insertTmplFromFile('#menu',data,'layout/menu.tpl');
                Common.insertTmplFromFile('#footer',data,'layout/footer.tpl');
            });
        });
    });
});