$(function(){

    function getBlog(ctx, callback) {
        ctx.api.form("blog")
            .orderings("[my.blog.date desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results)
            });
    }

    Common.getCtx().then(function(ctx) {

        getBlog(ctx, function(err, blog) {

            var infos = {
                documents: blog,
                ctx: ctx,
                page: 'blog',
                params: Common.parseQS(window.location.search.substring(1))
            }

            Common.insertTmplFromFile('#blog-list',infos,'layout/bloglist.tpl').then(function() {
                Common.insertTmplFromFile('.empty #blogsearch',infos,'layout/blogsearch.tpl');
            });
            
            Common.insertTmplFromFile('#blogsearch',infos,'layout/blogsearch.tpl');
            Common.insertTmplFromFile('#menu',infos,'layout/menu.tpl');
            Common.insertTmplFromFile('#footer',infos,'layout/footer.tpl');
        });

    });

});

