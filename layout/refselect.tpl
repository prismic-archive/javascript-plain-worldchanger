<script type="text/template">
  <div class="container">
      <% if (ctx.api.accessToken) { %>
          <form class="form-inline" role="form" method="GET">
            <div class="form-group">
              <label for="releaseSelector">See this website: </label>
            </div>
            <div class="form-group">
              <select id="releaseSelector" name="ref" onchange="this.form.submit()" class="form-control">
                <% if ( ctx.api.data.refs.map(function(r) {return r.ref;}).indexOf(ctx.ref) < 0 ) { %>
                  <option>?</option>
                <% } %>
                <option value="" <% if (ctx.ref == ctx.api.data.master.ref) { %>selected="selected"<% } %>>As currently seen by guest visitors</option>
                <optgroup label="Or preview the website in a future release:">
                  <% ctx.api.data.refs.filter(function(r) { return !r.isMaster; }).forEach(function (r) { %>
                    <option value="<%= r.ref %>" <% if (ctx.ref == r.ref) { %>selected="selected"<% } %>>
                      As <%= r.label %> <%= r.scheduledAt ? moment(r.scheduledAt).format("YYYY-MM-DD ") : '' %>
                    </option>
                  <% }); %>
                </optgroup>
              </select>
            </div>
          </form>
      <% } %>
  </div>
</script>