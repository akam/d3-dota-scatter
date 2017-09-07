d3.csv('./dota2.csv', function(database) {
	var newdata = database.reduce(function(prev,next){
		kda = (next['KDA']).split('/');
		kills = Number(kda[0]);
		deaths = Number(kda[1]);
		assists = Number(kda[2]);
		if(!prev[next['Hero']]){
			if(next['Result'] == 'Lost'){
				prev[next['Hero']] = [0,1,kills,deaths,assists]
			}else{
				prev[next['Hero']] = [1,0,kills,deaths,assists]
			}
		} else {
			if(next['Result'] == 'Lost'){
				prev[next['Hero']][1]++;
				prev[next['Hero']][2] += kills;
				prev[next['Hero']][3] += deaths;
				prev[next['Hero']][4] += assists;
			}else{
				prev[next['Hero']][0]++;
				prev[next['Hero']][2] += kills;
				prev[next['Hero']][3] += deaths;
				prev[next['Hero']][4] += assists;
			}
		}
		return prev
	}, {})
	var mid = ['Arc Warden','Brewmaster','Death Prophet','Dragon Knight','Ember Spirit','Invoker','Kunkka','Legion Commander','Leshrac','Lina','Magnus','Mirana','Naga Siren','Night Stalker','Outworld Devourer','Puck','Pudge','Pugna','Queen of Pain','Razor','Shadow Fiend','Storm Spirit','Templar Assassin','Tinker','Tiny','Viper','Zeus'];
	var hard_support = ['Bane','Crystal Maiden','Dazzle','Disruptor','Io','Jakiro','Keeper of the Light','Lich','Lion','Ogre Magi','Omniknight','Rubick','Shadow Demon','Shadow Shaman','Treant Protector','Vengeful Spirit','Visage','Warlock','Winter Wyvern','Witch Doctor'];
	var support = ['Abaddon','Ancient Apparition','Earthshaker','Necrophos','No Hero','Nyx Assassin','Sand King','Silencer','Spirit Breaker','Techies','Venomancer'];
	var offlane = ['Broodmother', 'Beastmaster','Bounty Hunter','Bristleback','Clockwerk','Dark Seer','Doom','Earth Spirit','Elder Titan','Lone Druid','Phoenix','Slardar','Tidehunter','Timbersaw','Tusk','Undying','Windranger'];
	var jungle = ['Axe','Batrider','Centaur Warrunner','Chen','Enchantress','Enigma',"Nature's Prophet"];
	var carry = ['Weaver', 'Alchemist','Anti-Mage','Bloodseeker','Chaos Knight','Clinkz','Drow Ranger','Luna','Faceless Void','Gyrocopter','Huskar','Juggernaut','Lifestealer','Lycan','Medusa','Ursa', 'Meepo','Morphling','Phantom Assassin','Phantom Lancer','Riki','Slark','Sniper','Spectre','Sven','Terrorblade','Troll Warlord','Wraith King'];
	var endData = [];
	var keys = Object.keys(newdata);
	for(var i = 0; i < keys.length; i++){
		var newObj = {};
		newObj['hero'] = keys[i];
		newObj['wins'] = newdata[keys[i]][0];
		newObj['loss'] = newdata[keys[i]][1];
		newObj['games'] = newdata[keys[i]][0] + newdata[keys[i]][1];
		newObj['rate'] = newdata[keys[i]][0]/(newdata[keys[i]][0] + newdata[keys[i]][1]);
		newObj['kills'] = newdata[keys[i]][2]/(newdata[keys[i]][0] + newdata[keys[i]][1]);
		newObj['deaths'] = newdata[keys[i]][3]/(newdata[keys[i]][0] + newdata[keys[i]][1]);
		newObj['assists'] = newdata[keys[i]][4]/(newdata[keys[i]][0] + newdata[keys[i]][1]);
		newObj['ratio'] = ((newdata[keys[i]][2] + newdata[keys[i]][4])/newdata[keys[i]][3]).toFixed(2);
		if(mid.includes(keys[i])){
			newObj['pos'] = 'mid'
		} else if (hard_support.includes(keys[i])){
			newObj['pos'] = 'hard_support'
		} else if (support.includes(keys[i])){
			newObj['pos'] = 'support'
		} else if (offlane.includes(keys[i])){
			newObj['pos'] = 'offlane'
		} else if (jungle.includes(keys[i])){
			newObj['pos'] = 'jungle'
		} else if (carry.includes(keys[i])){
			newObj['pos'] = 'carry'
		} else {
			console.log(keys[i])
		}
		endData.push(newObj)
	}
	//endData
	var width = 800;
	var height = 800;
	var svg = d3.select('svg')
				.attr("width", width)
				.attr("height", height);

	var padding = {
		top: 50,
		bottom: 20,
		right: 20,
		left: 70
	}

	var color = {
		mid: "#9930C7",
		hard_support: "#132B91",
		support: "#28CCC3",
		offlane: "#AB7C14",
		jungle: "#4AAB3C",
		carry: "#C7141D"
	}

	var xScale = d3.scaleLinear()
               .domain(d3.extent(endData, d => d.rate))
               .range([padding.left,width - padding.right]);

   	var xPerc = d3.scaleLinear()
              .domain([0, 100])
              .range([padding.left,width - padding.right]);

	var yScale = d3.scaleLinear()
               .domain(d3.extent(endData, d => d.games))
               .range([height - padding.top, padding.bottom]);

	var opa = d3.scaleLinear()
	           .domain(d3.extent(endData, d => d.games))
	           .range([0.3, 1]);

	var tooltip = d3.select("body")
                	.append("div")
                	.attr("class", "tooltip")
                	.style("opacity",0)
                	.style("position","absolute")
                	.style("font-size", "10px");
	
	svg.selectAll("circle")
		.data(endData)
		.enter()
		.append("circle")
		.attr('cx', d => xScale(d.rate))
		.attr('cy', d => yScale(d.games))
		.attr('r', 10)
		.attr('fill', d => color[d.pos])
		.attr('opacity', d=> opa(d.games))
		.attr('stroke', 'black')
		.attr('class', d => d.pos)
		.on("mouseover", function(d) {
	      tooltip.html(`<b>Hero:</b> ${d['hero']} <br> <b>Win rate:</b> ${Math.round(d['wins']/d['games']*100, -2)}% <br> <b>KDA:</b> ${d['ratio']} <br> Wins: ${d['wins']}, Losses: ${d['loss']}, Total Games: ${d['games']}`)
	             .style("opacity", 1)
	             .style("left", d3.event.pageX + "px")
           		 .style("top", d3.event.pageY + "px")
           		 .style("background", "lightblue")
           		 .style("font-size", '13px')
           		 .style("border-radius", "4px")
           		 .style("border", "solid black 2px")
           		 .style("padding", "1px")
	    })
	    .on("mouseout", function() {
	      tooltip.style("opacity", 0);
	    });


	//x-axis
	svg.append('g')
	   .attr("class","x-axis")
	   .attr("transform", "translate(0," + (height - padding.top) + ")")
	   .call(d3.axisBottom(xPerc));

	svg.append("text")
	    .attr("class", "x label")
	    .attr("text-anchor", "end")
	    .attr("x", width - 350)
	    .attr("y", height - 10)
	    .text("Win rate (%)");
	    
	//y-axis
	svg.append('g')
	   .attr("class","y-axis")
	   .attr("transform", "translate(" + padding.left + ",0)")
	   .call(d3.axisLeft(yScale));

	svg.append("text")
	    .attr("class", "y label")
	    .attr("text-anchor", "end")
	    .attr("x", -350)
	    .attr("y", -1)
	    .attr("dy", ".75em")
	    .attr("transform", "rotate(-90)")
	    .text("Games played");
	var toggle = true
	d3.select('.change').on("click", function(){
		if(toggle){
			str = 'ratio'
		} else {
			str = 'games'
		}
		var tCircle = d3.transition()
		                .duration(3000)
		                .ease(d3.easeSin);

		var tAxis = d3.transition()
		              .duration(1000)


		yScale = d3.scaleLinear()
					.domain(toggle ? [0,7] : d3.extent(endData, d => d.games))
					.range([height - padding.top, padding.bottom]);
		var opa = d3.scaleLinear()
	           		.domain(toggle ? [0,7] : d3.extent(endData, d => d.games))
	           		.range([0.3, 1]);
		d3.selectAll('circle')
			.transition(tCircle)
				.attr('opacity', d=> toggle ? opa(d.ratio) : opa(d.games))
				.attr('cy', function(d){
					if(!isNaN(yScale(d[str]))){
						return yScale(d[str]);	
					} else {
						return yScale(0);
					}
				})
		d3.selectAll('.y-axis')
			.transition(tAxis)
			.call(d3.axisLeft(yScale));
		toggle = !toggle
	})

    var button = document.querySelector(".btn-group").addEventListener("click",function(event){
    	var position = event.target.innerText;
    	event.target.classList.toggle("disabled");
    	if( position === "Jungle"){
    		var j = document.querySelectorAll('.jungle');
    		for(var i = 0; i < j.length; i++){
    			j[i].classList.toggle("visible");
    		}
    	} else if(position === "Hard Support"){
    		var j = document.querySelectorAll('.hard_support');
    		for(var i = 0; i < j.length; i++){
    			j[i].classList.toggle("visible");
    		}
    	} else if(position === "Support"){
    		var j = document.querySelectorAll('.support');
    		for(var i = 0; i < j.length; i++){
    			j[i].classList.toggle("visible");
    		}
    	} else if(position === "Offlane"){
    		var j = document.querySelectorAll('.offlane');
    		for(var i = 0; i < j.length; i++){
    			j[i].classList.toggle("visible");
    		}
    	} else if(position === "Carry"){
    		var j = document.querySelectorAll('.carry');
    		for(var i = 0; i < j.length; i++){
    			j[i].classList.toggle("visible");
    		}
    	} else if(position === "Middle"){
    		var j = document.querySelectorAll('.mid');
    		for(var i = 0; i < j.length; i++){
    			j[i].classList.toggle("visible");
    		}
    	}
    })
})

