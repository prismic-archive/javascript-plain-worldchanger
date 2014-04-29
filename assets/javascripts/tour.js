$(function(){

    function getImageDoc(docs, frag) {
        return docs.filter(function (doc) {
            return !!doc.getImage(frag);
        })[0];
    }

    function getArgs(ctx, callback) {
        ctx.api.form("arguments")
            .orderings("[my.argument.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, documents) {
                var photo = getImageDoc(documents.results, 'argument.photo');
                var panoramaPhoto = getImageDoc(documents.results, 'argument.panoramaphoto');
                var docs = documents.results.filter(function (doc) {
                    return doc.id != photo.id && doc.id != panoramaPhoto.id;
                });
                callback(err, docs, photo, panoramaPhoto);
            });
    }

    function getMinPrice(ctx, callback) {
        ctx.api.form("plans")
            .query('[[:d = at(document.type, "pricing")]]')
            .orderings("[my.pricing.price]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results[0].getNumber('pricing.price'));
            });
    }

    Common.getCtx().then(function(ctx) {
        Common.getBookmark('homepage', ctx).then(function(home) {
            Common.getBookmark('tour', ctx).then(function(tour) {
                getArgs(ctx, function(err, args, argPhoto, argPanoramaphoto) {
                    getMinPrice(ctx, function(err1, minPrice) {

                        var data = {
                            home: home,
                            tour: tour,
                            args: args,
                            argPhoto: argPhoto,
                            argPanoramaphoto: argPanoramaphoto,
                            minPrice: minPrice,
                            ctx: ctx,
                            page: 'tour'
                        };

                        Common.insertTmpl('#tour', data);
                        Common.insertTmplFromFile('#minimumplans', data, 'layout/minimumplans.tpl');
                        Common.insertTmplFromFile('#menu', data, 'layout/menu.tpl');
                        Common.insertTmplFromFile('#footer', data, 'layout/footer.tpl');
                    });
                });
            });
        });
    });
});