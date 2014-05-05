<script type="text/template">
  <header class="navbar navbar-worldchanger" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#top-navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">WorldChanger</a>
      </div>
      <div class="navbar-collapse collapse" id="top-navbar">
        <ul class="nav navbar-nav navbar-right">
          <li <% if (page == 'home') { %> class="active" <% } %>><a href=<%= ctx.linkTo("/index.html")%>>Home</a></li>
          <li <% if (page == 'tour') { %> class="active" <% } %>><a href=<%= ctx.linkTo("/tour.html")%>>Product tour</a></li>
          <li <% if (page == 'pricing') { %> class="active" <% } %>><a href=<%= ctx.linkTo("/pricing.html")%>>Pricing</a></li>
          <li <% if (page == 'faq') { %> class="active" <% } %>><a href=<%= ctx.linkTo("/faq.html")%>>FAQ</a></li>
          <li <% if (page == 'about') { %> class="active" <% } %>><a href=<%= ctx.linkTo("/about.html")%>>About us</a></li>
          <li <% if (page == 'blog' || page == 'blogpost' || page == 'blogsearch') { %> class="active" <% } %>><a href=<%= ctx.linkTo("/blog.html")%>>Blog</a></li>
        </ul>
      </div>
    </div>
  </header>
  <div class="container"></div>
</script>
