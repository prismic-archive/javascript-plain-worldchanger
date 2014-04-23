var urlAPI = 'https://worldchanger1.prismic.io/api';
var master = 'Uxd1owEAAJ4oj-dR';
var CTX = {};


$(function() {

    var cache = {};
    window.tmpl = function tmpl(str, data){
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                "with(obj){p.push('" +
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
          + "');}return p.join('');");
       
        return data ? fn( data ) : fn;
    };

    



    Prismic.Api(urlAPI, function(err, api){

        // contexte

        CTX = {
            ref: master,
            api: api,
            maybeRef: (master && master != api.data.master.ref ? master : ''),
            maybeRefParam: (master && master != api.data.master.ref ? '&ref=' + master : ''),
        
            linkResolver: function(ctx, documentLink) {
                //return 'detail.html?id=' + doc.id + '&slug=' + doc.slug + ctx.maybeRefParam;
                console.log('fthyfjy');
                if (documentLink.isBroken) return;

                /* Based on bookmark name of the document */
                if(documentLink.id == ctx.api.bookmarks['about']) {
                  return '/about.html' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
                if(documentLink.id == ctx.api.bookmarks['faq']) {
                  return '/faq.html' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
                if(documentLink.id == ctx.api.bookmarks['homepage']) {
                  return '/homepage.html' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
                if(documentLink.id == ctx.api.bookmarks['pricing']) {
                  return '/pricing.html' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
                if(documentLink.id == ctx.api.bookmarks['tour']) {
                  return '/tour.html' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
                }
            }
        }

        // index.html

        function getDocById(id, callback) {
            api.form("everything")
                .query('[[:d = at(document.id, "'+id+'")]]')
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results[0])
                });
        }
    
        function getFriendlyArgs(callback) {
            api.form("arguments")
                .query('[[:d = at(document.tags, ["userfriendly"])][:d = at(document.tags, ["featured"])]]')
                .orderings("[my.argument.priority desc]")
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results)
                });
        }

        function getDesignArgs(callback) {
            api.form("arguments")
                .query('[[:d = at(document.tags, ["design"])][:d = at(document.tags, ["featured"])]]')
                .orderings("[my.argument.priority desc]")
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results)
                });
        }

        function getQuestions(callback) {
            api.form("questions")
                .query('[[:d = at(document.tags, ["featured"])]]')
                .orderings("[my.faq.priority desc]")
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results)
                });
        }

        function getMinPrice(callback) {
            api.form("plans")
                .query('[[:d = at(document.type, "pricing")]]')
                .orderings("[my.pricing.price]")
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results[0].getNumber('pricing.price'))
                });
        }

        // tour

        function getArgs(callback) {
            api.form("arguments")
                .orderings("[my.argument.priority desc]")
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results)
                });
        }

    });
});

;(function($){

    /* On the FAQ page, opens the right accordion item if the ID of the question is passed as the hash */
    /* This can only be done through the front-end, as the hash is never passed to the server. */
    $(document).ready(function(){
        if ($('article#faq').length != 0) {
            var hash = window.location.hash.substring(1);
            $('#'+hash).addClass("in").css('height', 'auto');
        }
    });

}( jQuery ));



