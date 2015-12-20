(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['AssetParameters'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <div class=\"form-group col-md-4 col-sm-6\">\n            <label for=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\n            <input type=\"text\" class=\"form-control\" id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" placeholder=\""
    + alias4(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\">\n        </div>\n\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class='row'>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.parameter : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<div class='row'>\n<button class='btn btn-primary' onclick='getMC();'>Run</button>\n</div>";
},"useData":true});
templates['MarketRiskParameters'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <option value='"
    + alias4(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"value","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class='row'>\n    <div class=\"form-group col-md-4 col-sm-6\">\n        <label for=\"asset\">Asset Type</label>\n        <select id='asset' class=\"form-control\" onchange=\"displayOptions(this.value)\">\n            <option value=\"\" disabled selected style=\"display:none;\"></option>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.assets : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\n    </div>\n    <div class=\"form-group col-md-4 col-sm-6\">\n        <label for=\"n\">Number of simulations</label>\n        <input type=\"text\" class=\"form-control\" id=\"n\" placeholder=\"1000\">\n    </div>\n    <div class=\"form-group col-md-4 col-sm-6\">\n        <label for=\"sigma\">Volatility</label>\n        <input type=\"text\" class=\"form-control\" id=\"sigma\" placeholder=\".04\">\n    </div>\n    <div class=\"form-group col-md-4 col-sm-6\">\n        <label for=\"a\">Mean Reversion</label>\n        <input type=\"text\" class=\"form-control\" id=\"a\" placeholder=\".2\">\n    </div>\n    <div class=\"form-group col-md-4 col-sm-6\">\n        <label for=\"t\">Simulate to date (in days)</label>\n        <input type=\"text\" class=\"form-control\" id=\"t\" placeholder=\"10\">\n    </div>\n</div>";
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
templates['modal'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<!-- Modal -->\n<div class=\"modal fade\" id=\"newModal\" tabindex=\"-1\" role=\"dialog\" ><!--aria-labelledby=\"myModalLabel\">-->\n  <div class=\"modal-dialog modal-lg\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\" id=\"myModalLabel\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</h4>\n      </div>\n      <div class=\"modal-body\">\n        \n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n\n      </div>\n    </div>\n  </div>\n</div>";
},"useData":true});
templates['progressbar'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"progress\">\n  <div class=\"progress-bar progress-bar-striped active\" role=\"progressbar\" id='progressBar' aria-valuenow=\"100\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: "
    + container.escapeExpression(((helper = (helper = helpers.percent || (depth0 != null ? depth0.percent : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"percent","hash":{},"data":data}) : helper)))
    + "%\">\n    <!--<span class=\"sr-only\">45% Complete</span>-->\n  </div>\n</div>\n";
},"useData":true});
})();