$(function(){

    function getImageDoc(docs, frag) {
        return docs.filter(function (doc) {
            return !!doc.getImage(frag);
        })[0];
    }

    function getArgs(ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("arguments")
            .orderings("[my.argument.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, documents) {
                var photo = getImageDoc(documents.results, 'argument.photo');
                var panoramaPhoto = getImageDoc(documents.results, 'argument.panoramaphoto');
                var docs = documents.results.filter(function (doc) {
                    return doc.id != photo.id && doc.id != panoramaPhoto.id;
                });
                if(err) {
                    dfd.reject(err);
                } else {
                    dfd.resolve({docs: docs, photo: photo, panoramaPhoto: panoramaPhoto});
                }
            });
        return dfd.promise();
    }

    function getMinPrice(ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("plans")
            .query('[[:d = at(document.type, "pricing")]]')
            .orderings("[my.pricing.price]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                if(err) {
                    dfd.reject(err);
                } else {
                    dfd.resolve(docs.results[0].getNumber('pricing.price'));
                }
            });
        return dfd.promise();
    }

    Common.getCtx().then(function(ctx) {

        $.when(Common.getBookmark('homepage', ctx),
                Common.getBookmark('tour', ctx),
                getArgs(ctx),
                getMinPrice(ctx)
            ).then(function(home, tour, arguments, minPrice) {

                var data = {
                    home: home,
                    tour: tour,
                    args: arguments.docs,
                    argPhoto: arguments.photo,
                    argPanoramaphoto: arguments.panoramaPhoto,
                    minPrice: minPrice,
                    ctx: ctx,
                    page: 'tour'
                };
                
                Common.insertTmpl('#tour', data);
                Common.insertTmplFromFile('#minimumplans', data, 'layout/minimumplans.tpl');
                Common.insertTmplFromFile('#menu', data, 'layout/menu.tpl');
                Common.insertTmplFromFile('#refselect', data, 'layout/refselect.tpl');
                Common.insertTmplFromFile('#footer', data, 'layout/footer.tpl');

            }).fail(Common.handleError);
    }).fail(Common.handleError);
});