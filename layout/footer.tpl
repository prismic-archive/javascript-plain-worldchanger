<script type="text/template">
  <div class="footer-container">
    <footer class="container">
      <p>
        WorldChanger is an example website to be used freely on top of the 
        <a href="http://prismic.io">prismic.io</a>
        writing-room and content query API.
      </p>
      <p>
        <% if (ctx.api.accessToken) { %>
          <a href="/index.html">Sign out</a>
        <% } else { %>
          <a href="/signin.html">Sign in to preview changes</a>
        <% } %>
      </p>
    </footer>
  </div>
</script>
