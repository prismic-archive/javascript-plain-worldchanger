<script type="text/template">

	<div class="container" id="pricewell">
		<p> <%= home.getText("homepage.pricing_label") ? home.getText("homepage.pricing_label") : '' %> <strong> $<%= minPrice %>/mo </strong> </p>
		<p><a class="btn btn-pricing" href="/pricing.html" role="button">
			<%= home.getText("homepage.pricing_button_label") ? home.getText("homepage.pricing_button_label") : '' %> </a></p>
	</div>

	<style type="text/css">
	    #pricewell {
	    	background-image: url(<%= home.getImage("homepage.pricing_image") && home.getImageView("homepage.pricing_image","small") ? home.getImageView("homepage.pricing_image","small").url : '' %>)
	    }
	    @media (max-width: 767px) {
	    	#pricewell {
	    		background-image: url(<%= home.getImage("homepage.pricing_image") && home.getImageView("homepage.pricing_image","icon") ? home.getImageView("homepage.pricing_image","icon").url : '' %>)
	    	}
	    }
	</style>

</script>