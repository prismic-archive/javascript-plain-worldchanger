window.Common = {

    getApi: function () {
        var dfd = new jQuery.Deferred();
        Prismic.Api('https://worldchanger1.prismic.io/api', function(err, api) {
            if(err) {
                dfd.reject(err);
            } else {
                dfd.resolve(api);
            }
        });
        return dfd.promise();
    },

    getCtx: function() {
        var dfd = new jQuery.Deferred();
        this.getApi().then(function(api) {
            var ctx = {
                ref: api.data.master.ref,
                api: api,

                linkResolver: function(ctx, documentLink) {
                    if(documentLink.isBroken) return;

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
            dfd.resolve(ctx);
        });
        return dfd.promise();
    },

    getDocById: function(id, ctx) {
        var dfd = new jQuery.Deferred();
        ctx.api.form("everything")
            .query('[[:d = at(document.id, "'+ id +'")]]')
            .ref(ctx.ref)
            .submit(function (err, docs) {
                if(err) {
                    dfd.reject(err);
                } else {
                    dfd.resolve(docs.results[0]);
                }
            });
        return dfd.promise();
    },

    getDocsById: function(ids, ctx) {
        var promises = ids.map(function (id) {
            return Common.getDocById(id, ctx);
        });
        return $.when.apply($, promises).then(function() {
            return Array.prototype.slice.call(arguments);
        });
    },

    getBookmark: function(name, ctx) {
        return this.getDocById(ctx.api.bookmarks[name], ctx);
    },

    insertTmpl: function(place, ctx) {
        var source = $(place).find('script[type="text/template"]').html();
        var template = source ? tmpl(source) : undefined;
        if(template) {
            $(place).html(template(ctx));
        }
    },

    insertTmplFromFile: function(place, ctx, file) {
        return $.get(file,function (data) {
            $(place).html(data);
            var source = $(place).find('script[type="text/template"]').html();
            var template = source ? tmpl(source) : undefined;
        
            if(template) {
                $(place).html(template(ctx));
            }
        });
    },

    parseQS: function(query) {
        var params = {},
            match,
            pl = /\+/g,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
        while (match = search.exec(query)) {
           params[decode(match[1])] = decode(match[2]);
        }
        return params;
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



