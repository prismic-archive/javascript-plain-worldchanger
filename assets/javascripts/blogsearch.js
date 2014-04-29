$(function(){

    function getBlog(ctx, callback) {
        var params = Common.parseQS(window.location.search.substring(1));
        
        ctx.api.form("blog")
            .query('[[:d = fulltext(document, "'+ params.q +'")]]')
            .orderings("[my.blog.date desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results, params)
            });
    }

    Common.getCtx().then(function(ctx) {

        getBlog(ctx, function(err, blog, params) {

            var infos = {
                documents: blog,
                ctx: ctx,
                page: 'blogsearch',
                params: params
            }

            Common.insertTmplFromFile('#blog-list',infos,'layout/bloglist.tpl').then(function(){
                Common.insertTmplFromFile('.empty #blogsearch',infos,'layout/blogsearch.tpl');
            });
            
            Common.insertTmplFromFile('#blogsearch',infos,'layout/blogsearch.tpl');
            Common.insertTmplFromFile('#menu',infos,'layout/menu.tpl');
            Common.insertTmplFromFile('#footer',infos,'layout/footer.tpl');
        });

    });

});

