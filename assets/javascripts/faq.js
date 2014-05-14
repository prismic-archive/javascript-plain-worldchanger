$(function(){

    function getQuestions(ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("questions")
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

    Common.getCtx().then(function(ctx) {

        $.when(Common.getBookmark('faq', ctx),
                getQuestions(ctx)
            ).then(function(faq, questions) {

                var data = {
                    faq: faq,
                    questions: questions,
                    ctx: ctx,
                    page: 'faq'
                };

                Common.insertTmpl('#faq',data);
                Common.insertTmplFromFile('#faqaccordion',data,'layout/faqaccordion.tpl');
                Common.insertTmplFromFile('#menu',data,'layout/menu.tpl');
                Common.insertTmplFromFile('#refselect', data, 'layout/refselect.tpl');
                Common.insertTmplFromFile('#footer',data,'layout/footer.tpl');

            }).fail(Common.handleError);
    }).fail(Common.handleError);
});