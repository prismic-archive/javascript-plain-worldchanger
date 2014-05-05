$(function(){

    function getBlog(ctx, callback) {
        ctx.api.form("blog")
            .orderings("[my.blog.date desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results);
            });
    }

    Common.getCtx().then(function(ctx) {

        getBlog(ctx, function(err, blog) {
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
        });
    });
});
