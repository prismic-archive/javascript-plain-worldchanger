$(function(){

    function getBlog(ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("blog")
            .orderings("[my.blog.date desc]")
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

        getBlog(ctx).then(function(blog) {

            var data = {
                documents: blog,
                ctx: ctx,
                page: 'blog',
                params: Common.getParams()
            };

            Common.insertTmplFromFile('#blog-list', data,'layout/bloglist.tpl').then(function() {
                Common.insertTmplFromFile('.empty #blogsearch', data,'layout/blogsearch.tpl');
            });
            Common.insertTmplFromFile('#blogsearch', data, 'layout/blogsearch.tpl');
            Common.insertTmplFromFile('#menu', data, 'layout/menu.tpl');
            Common.insertTmplFromFile('#refselect', data, 'layout/refselect.tpl');
            Common.insertTmplFromFile('#footer', data, 'layout/footer.tpl');

        }).fail(Common.handleError);
    }).fail(Common.handleError);
});
