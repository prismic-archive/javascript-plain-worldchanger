$(function(){

    function getStaff(ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("staff")
            .orderings("[my.author.level]")
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

        $.when(Common.getBookmark('about', ctx),
                getStaff(ctx)
            ).then(function(about, staff) {

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

            }).fail(Common.handleError);
    }).fail(Common.handleError);
});