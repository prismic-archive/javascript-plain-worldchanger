$(function(){

    function getBlog(ctx) {
        var dfd = new jQuery.Deferred(),
            params = Common.getParams();
        ctx.api.form("blog")
            .query('[[:d = fulltext(document, "'+ params.q +'")]]')
            .orderings("[my.blog.date desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                if(err) {
                    dfd.reject(err);
                } else {
                    dfd.resolve({blog: docs.results, params: params});
                }
            });
        return dfd.promise();
    }

    Common.getCtx().then(function(ctx) {

        getBlog(ctx).then(function(research) {

            var data = {
                documents: research.blog,
                ctx: ctx,
                page: 'blogsearch',
                params: research.params
            };

            Common.insertTmplFromFile('#blog-list', data, 'layout/bloglist.tpl').then(function(){
                Common.insertTmplFromFile('.empty #blogsearch', data, 'layout/blogsearch.tpl');
            });
            Common.insertTmplFromFile('#blogsearch', data, 'layout/blogsearch.tpl');
            Common.insertTmplFromFile('#menu', data, 'layout/menu.tpl');
            Common.insertTmplFromFile('#refselect', data, 'layout/refselect.tpl');
            Common.insertTmplFromFile('#footer', data, 'layout/footer.tpl');

        }).fail(Common.handleError);
    }).fail(Common.handleError);
});