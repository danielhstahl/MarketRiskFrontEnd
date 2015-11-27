(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['MarketRiskParameters'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"input-group\">\n  <span class=\"input-group-addon\" id=\"simulation\">Number of simulations</span>\n  <input type=\"text\" class=\"form-control\" placeholder=\"Username\" aria-describedby=\"basic-addon1\">\n</div>\n";
},"useData":true});
templates['progressbar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"progress\">\n  <div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%\">\n    <!--<span class=\"sr-only\">45% Complete</span>-->\n  </div>\n</div>\n";
},"useData":true});
})();