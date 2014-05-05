$(function(){

    var clientId = "U1-AywEAAC0AqYN-",
        scope = "master+releases",
        redirectUri = 'http://localhost:8000/index.html',

        url = "https://worldchanger1.prismic.io/auth?"
                + "client_id=" + clientId
                + "&redirect_uri=" + encodeURIComponent(redirectUri)
                + "&scope=" + encodeURIComponent(scope)
                + "&response_type=token"
                + "&state=ABCDEF";

    window.location.replace(url);
});

