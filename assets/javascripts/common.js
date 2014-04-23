window.Common = {
    getApi: function (callback) {
        Prismic.Api('https://worldchanger1.prismic.io/api', function(err, api) {
            callback(err, api);
        });
    },

    getCtx: function(callback) {
        this.getApi(function(err, api) {
            var ctx = {
                ref: api.data.master.ref,
                api: api,

                linkResolver: function(ctx, documentLink) {
                    if (documentLink.isBroken) return;

                    if(documentLink.id == ctx.api.bookmarks['about']) {
                      return '/about.html';
                    }
                    if(documentLink.id == ctx.api.bookmarks['faq']) {
                      return '/faq.html';
                    }
                    if(documentLink.id == ctx.api.bookmarks['homepage']) {
                      return '/homepage.html';
                    }
                    if(documentLink.id == ctx.api.bookmarks['pricing']) {
                      return '/pricing.html';
                    }
                    if(documentLink.id == ctx.api.bookmarks['tour']) {
                      return '/tour.html';
                    }
                }
            };
            callback(err, ctx);
        });
    },

    getDocById: function(id, ctx, callback) {
        ctx.api.form("everything")
            .query('[[:d = at(document.id, "'+ ctx.api.bookmarks[id] +'")]]')
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results[0])
            });
    }
};

(function() {

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
})();



