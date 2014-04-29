<script type="text/template">
  <form class="input-group" action="/blogsearch.html">
    <input type="text" name="q" class="form-control" placeholder="Search in the blog" value="<%= params.q ? params.q : '' %>">
    <span class="input-group-btn">
      <button class="btn btn-default" type="submit">Search</button>
    </span>
  </form>
</script>
