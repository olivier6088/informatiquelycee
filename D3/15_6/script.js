var body=d3.select("body");
body.append("h1").style("text-align","center").html("Haute-Savoie");
var svg=body.append("svg");
svg.attr({"width":"520px","height":"480px"});
var path = d3.geo.path();
var projection = d3.geo.conicConformal()
    .center([6.5, 46])
    .scale(35000)
    .translate([300,300]);
path.projection(projection);
var div = d3.select("body").append("div")                  
    .style({"opacity":0,"position": "absolute","left": "440px","top":"100px"});
d3.json("communes.geojson", function(geoJSON) {
	var map=svg.selectAll("path").data(geoJSON.features)
   map.enter()
        .append("path")
        .attr("fill","white")
        .attr("stroke","black")
        .attr("d", path)
        .on("mouseover",function(d){
        		d3.select(this)
        			.transition()        
               .duration(200)
               .attr("fill","red");
        		div.transition()        
                .duration(200)
                .style("opacity", .9);      
            div.html("Commune : " + d.properties.nom)
        	})
        	.on("mouseout",function(d){
        		d3.select(this)
        			.transition()        
               .duration(200)
               .attr("fill","white");
        		div.transition()
                .duration(500)
                .style("opacity", 0);
            div.html("");
        	});
});

