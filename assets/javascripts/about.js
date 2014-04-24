$(function(){

    function getStaff(ctx, callback) {
        ctx.api.form("staff")
            .orderings("[my.author.level]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results)
            });
    }

    Common.getCtx(function(err, ctx){

        Common.getDocById('about', ctx, function(err1, about) {
            getStaff(ctx, function(err2, staff) {
                
                var infos = {
                    about: about,
                    staff: staff,
                    ctx: ctx,
                    page: 'about'
                }
                
                Common.insertTmpl('#about',infos);
                Common.insertTmplFromFile('#menu',infos,'layout/menu.tpl');
                Common.insertTmplFromFile('#footer',infos,'layout/footer.tpl');

            });
        });

    });

});