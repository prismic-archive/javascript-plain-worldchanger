$(function(){

    function getStaff(ctx, callback) {
        ctx.api.form("staff")
            .orderings("[my.author.level]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results);
            });
    }

    Common.getCtx().then(function(ctx) {

        Common.getBookmark('about', ctx).then(function(about) {

            getStaff(ctx, function(err, staff) {
                var data = {
                    about: about,
                    staff: staff,
                    ctx: ctx,
                    page: 'about'
                };
                Common.insertTmpl('#about', data);
                Common.insertTmplFromFile('#menu', data, 'layout/menu.tpl');
                Common.insertTmplFromFile('#refselect', data, 'layout/refselect.tpl');
                Common.insertTmplFromFile('#footer', data, 'layout/footer.tpl');
            });
        });
    });
});