<script type="text/template">
  <div class="panel-group" id="accordion">
    <% questions.forEach(function (question, i) { %>
    <div class="panel">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" href="#<%= question.id %>" class="collapsed">
            <%= question.getStructuredText('faq.question') ? question.getStructuredText('faq.question').getTitle().text : '' %>
            <span class="accordion-arrow down">&#9660;</span><span class="accordion-arrow up">&#9650;</span>
          </a>
        </h4>
      </div>
      <div id="<%= question.id %>" class="panel-collapse collapse<%= page == 'faq' && i==0 ? ' in' : '' %>">
        <div class="panel-body">
          <%= question.getStructuredText('faq.answer') ? question.getStructuredText('faq.answer').asHtml(ctx) : '' %>
        </div>
      </div>
    </div>
    <% });%>
  </div>
</script>
