$(function(){

    function getImageDoc(docs, frag, callback) {
        docs.forEach(function (doc, i) {
            if(doc.getImage(frag)) {
                callback(doc, i);
            }
        });
    }

    function getArgs(ctx, callback) {
        ctx.api.form("arguments")
            .orderings("[my.argument.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, documents) {
                
                var docs = documents.results;
                getImageDoc(docs, 'argument.photo', function(photo, ip) {
                    getImageDoc(docs, 'argument.panoramaphoto', function(panoramaphoto, ipp) {
                        docs.splice(ip, 1);
                        docs.splice(ipp - 1, 1);
                        callback(err, docs, photo, panoramaphoto);
                    });
                });

            });
    }

    function getMinPrice(ctx, callback) {
        ctx.api.form("plans")
            .query('[[:d = at(document.type, "pricing")]]')
            .orderings("[my.pricing.price]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results[0].getNumber('pricing.price'))
            });
    }

    Common.getCtx().then(function(ctx) {

        Common.getBookmark('homepage', ctx).then(function(home) {
            Common.getBookmark('tour', ctx).then(function(tour) {
                getArgs(ctx, function(err, args, argPhoto, argPanoramaphoto) {
                    getMinPrice(ctx, function(err1, minPrice) {

                        var infos = {
                            home: home,
                            tour: tour,
                            args: args,
                            argPhoto: argPhoto,
                            argPanoramaphoto: argPanoramaphoto,
                            minPrice: minPrice,
                            ctx: ctx,
                            page: 'tour'
                        }

                        Common.insertTmpl('#tour',infos);

                        Common.insertTmplFromFile('#minimumplans',infos,'layout/minimumplans.tpl');
                        Common.insertTmplFromFile('#menu',infos,'layout/menu.tpl');
                        Common.insertTmplFromFile('#footer',infos,'layout/footer.tpl');

                    });
                });
            });
        });

    });

});