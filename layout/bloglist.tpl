<script type="text/template">
  <div class="container">
    <% if (documents.length == 0) { %>
      <div class="empty">
        <h3>No document matches your search. Search again?</h3>
          <div id="blogsearch"></div>
      </div>
    <% }; %>
    <% documents.forEach(function (doc) { %>
      <a href=<%= ctx.linkResolver(ctx, doc) %> class="row blog-post">
        <div class="col-md-3 image">
          <p>
            <%= doc.getImage('blog.image') && doc.getImageView('blog.image','medium') ? doc.getImageView('blog.image','medium').asHtml(ctx) : '' %>
          </p>
        </div>
        <div class="col-md-9 preview">
          <h2>
            <%= doc.getStructuredText('blog.body').getTitle().text %>
          </h2>
          <p class="date">
            On <%= doc.getDate('blog.date') ? moment(doc.getDate('blog.date')).format("MMM D YYYY") : '' %>
          </p>
            <%= doc.getStructuredText('blog.shortlede') ? doc.getStructuredText('blog.shortlede').asHtml(ctx) : '' %>
        </div>
      </a>
    <% }); %>
  </div>
</script>
