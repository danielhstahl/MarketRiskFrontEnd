(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['MarketRiskParameters'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"input-group\">\n  <span class=\"input-group-addon\" id=\"simulation\">Number of simulations</span>\n  <input type=\"text\" class=\"form-control\" placeholder=\"Username\" aria-describedby=\"basic-addon1\">\n</div>\n";
},"useData":true});
templates['largetext'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "<h2> "
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"key","hash":{},"data":data}) : helper)))
    + ": "
    + alias1(container.lambda(depth0, depth0))
    + "<h2>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['progressbar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"progress\">\n  <div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" id='progressBar' aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "
    + container.escapeExpression(((helper = (helper = helpers.percent || (depth0 != null ? depth0.percent : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"percent","hash":{},"data":data}) : helper)))
    + "%\">\n    <!--<span class=\"sr-only\">45% Complete</span>-->\n  </div>\n</div>\n";
},"useData":true});
})();