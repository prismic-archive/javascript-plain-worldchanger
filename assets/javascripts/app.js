$(function(){

//$("#qwe").load("all.html");

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

    var urlAPI = 'https://worldchanger1.prismic.io/api';
    var master = 'Uxd1owEAAJ4oj-dR';



    Prismic.Api(urlAPI, function(err, api){

        var CTX = {
            ref: master,
            api: api,
            maybeRef: (master && master != api.data.master.ref ? master : ''),
            maybeRefParam: (master && master != api.data.master.ref ? '&ref=' + master : ''),
        
            linkResolver: function(ctx, documentLink) {
                //return 'detail.html?id=' + doc.id + '&slug=' + doc.slug + ctx.maybeRefParam;
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

        if ($('#homepage').length != 0) {

            getDocById(api.bookmarks['homepage'], function(err1, home) {
                getFriendlyArgs(function(err2, friendlyArgs) {
                    getDesignArgs(function(err3, designArgs) {
                        getQuestions(function(err4, questions) {
                            getMinPrice(function(err5, minPrice) {
                                var source = $('body').find('script[type="text/template"]').html();
                                var template = source ? tmpl(source) : undefined;
                                
                                infos = {
                                    friendlyArgs: friendlyArgs,
                                    designArgs: designArgs,
                                    questions: questions,
                                    home: home,
                                    minPrice: minPrice,
                                    ctx: CTX
                                }
                                if(template) {
                                    $('#homepage').html(template(infos));
                                }
                            });
                        });
                    });
                });
            });

        }

        // tour.html

        function getArgs(callback) {
            api.form("arguments")
                .orderings("[my.argument.priority desc]")
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results)
                });
        }

        if ($('#tour').length != 0) {

            getDocById(api.bookmarks['homepage'], function(err1, home) {
                getDocById(api.bookmarks['tour'], function(err2, tour) {
                    getArgs(function(err3, args) {
                        getMinPrice(function(err4, minPrice) {
                            var source = $('body').find('script[type="text/template"]').html();
                            var template = source ? tmpl(source) : undefined;

                            infos = {
                                home: home,
                                tour: tour,
                                args: args,
                                minPrice: minPrice,
                                ctx: CTX
                            }
                            if(template) {
                                $('#tour').html(template(infos));
                            }
                        });
                    });
                });
            });

        }

        // pricing.html

        function getQuestions2(callback) {
            api.form("questions")
                .query('[[:d = at(document.tags, ["pricing"])]]')
                .orderings("[my.faq.priority desc]")
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results)
                });
        }

        function getplans(callback) {
            api.form("plans")
                .orderings("[my.pricing.price]")
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results)
                });
        }

        if ($('#pricing').length != 0) {

            getDocById(api.bookmarks['pricing'], function(err1, pricing) {
                getplans(function(err2, plans) {
                    getQuestions2(function(err3, questions) {
                        var source = $('body').find('script[type="text/template"]').html();
                        var template = source ? tmpl(source) : undefined;

                        infos = {
                            pricing: pricing,
                            plans: plans,
                            questions: questions,
                            ctx: CTX
                        }
                        if(template) {
                            $('#pricing').html(template(infos));
                        }
                    });
                });
            });

        }

        // faq.html

        function getQuestions3(callback) {
            api.form("questions")
                .orderings("[my.faq.priority desc]")
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results)
                });
        }

        if ($('#faq').length != 0) {

            getDocById(api.bookmarks['faq'], function(err1, faq) {
                getQuestions3(function(err2, questions) {
                    var source = $('body').find('script[type="text/template"]').html();
                    var template = source ? tmpl(source) : undefined;

                    infos = {
                        faq: faq,
                        questions: questions,
                        ctx: CTX
                    }
                    if(template) {
                        $('#faq').html(template(infos));
                    }
                });
            });

        }

        // about.html

        function getStaff(callback) {
            api.form("staff")
                .orderings("[my.author.level]")
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results)
                });
        }

        if ($('#about').length != 0) {

            getDocById(api.bookmarks['about'], function(err1, about) {
                getStaff(function(err2, staff) {
                    var source = $('body').find('script[type="text/template"]').html();
                    var template = source ? tmpl(source) : undefined;
                    
                    infos = {
                        about: about,
                        staff: staff,
                        ctx: CTX
                    }
                    if(template) {
                        $('#about').html(template(infos));
                    }
                });
            });

        }

        // blog.html

        function getBlog(callback) {
            api.form("blog")
                .orderings("[my.blog.date desc]")
                .ref(master)
                .submit(function (err, docs) {
                    callback(err, docs.results)
                });
        }

        if ($('#blog-list').length != 0) {

            getBlog(function(err1, blog) {
                var source = $('body').find('script[type="text/template"]').html();
                var template = source ? tmpl(source) : undefined;
                console.log(blog);
                infos = {
                    documents: blog,
                    ctx: CTX
                }
                if(template) {
                    $('#blog-list').html(template(infos));
                }
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


// initialisation de l'ordre d'affichage des documents
                /*var list = new Array(args.length),
                    cpt = 0;
                args.forEach(function (doc, i) {
                    if (doc.getImage("argument.photo")) {
                        list[0] = doc;
                    }
                    else {
                        if (doc.getImage("argument.panoramaphoto")) {
                            list[3] = doc;
                        }
                        else {
                            if (cpt != 0 && cpt != 3) {
                                list[cpt] = doc;
                            }
                        }
                    }
                    cpt++;
                });*/

/*$('h1').click(function() {
        $(this).css('color','green');
        console.log('AAAAAA');
        var hash = this.href.substring(1);
        console.log(hash);
        if($(hash).hasClass("in")) {
            $(hash).addClass("in").css('height', 'auto');
        }
        else {
            $(hash).removeClass("in").css('height', '0px');
        }
    });*/

/*for(var key in env) {
    if(env.hasOwnProperty(key)) {
        (function (bm) {
            // traitement de bm
        }(key));
    }
}*/

/*linkResolverfraew = function(ctx, documentLink) {
            if (documentLink.isBroken) return;

            /* Based on bookmark name of the document *//*
            if(documentLink.id == ctx.api.bookmarks['about']) {
              return '/about' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }
            if(documentLink.id == ctx.api.bookmarks['faq']) {
              return '/faq' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }
            if(documentLink.id == ctx.api.bookmarks['homepage']) {
              return '/homepage' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }
            if(documentLink.id == ctx.api.bookmarks['pricing']) {
              return '/pricing' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }
            if(documentLink.id == ctx.api.bookmarks['tour']) {
              return '/tour' + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }

            /* Based on document type of the document *//*
            if(documentLink.type == 'argument') {
              return '/arguments/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }
            if(documentLink.type == 'article') {
              return '/articles/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }
            if(documentLink.type == 'author') {
              return '/authors/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }
            if(documentLink.type == 'blog') {
              return '/blogs/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }
            if(documentLink.type == 'faq') {
              return '/faqs/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }
            if(documentLink.type == 'homepage') {
              return '/homepage/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }
            if(documentLink.type == 'pricing') {
              return '/pricings/' + documentLink.id + '/' + documentLink.slug + (ctx.maybeRef ? '?ref=' + ctx.maybeRef : '');
            }
        }*/


