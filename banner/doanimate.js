(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback, element) {
           // var currTime = new Date().getTime();
          //  var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            //var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              //timeToCall);
           // lastTime = currTime + timeToCall;
		   var id = window.setTimeout(function() { callback(); },1000/60);
            return id;
        };
	}

    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
	}
}());

var transitionEnd = transitionEndEventName();
function transitionEndEventName () {
    var i,
        undefined,
        el = document.createElement('div'),
        transitions = {
            'transition':'transitionend',
            'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
        }
    }
}

function Do(id, params, duration, delay){
	
	var x, y, scale, angle, alpha, visible, easing;
	var frame=0;
	var  transform="";
	var flags=[];
	var dur=duration;

	
	wait();
	
	function wait(){
		if (frame/60>=delay){
			anim();
		}else{
			frame++;
			requestAnimationFrame(wait);
		}
	}
	
	function anim(){
		
		
		 
		 var st = window.getComputedStyle(id, null);

		 var tr = st.getPropertyValue("-webkit-transform") || st.getPropertyValue("-moz-transform") || st.getPropertyValue("-ms-transform") || st.getPropertyValue("-o-transform") || st.getPropertyValue("transform") || "Either no transform set, or browser doesn't do getComputedStyle";
		 
		 var opacity = st.getPropertyValue("opacity") || "Either no transform set, or browser doesn't do getComputedStyle";
		 
		 var vis= st.getPropertyValue("visibility") || "Either no transform set, or browser doesn't do getComputedStyle";

		if(tr !== "none") {
		
		var values = tr.split('(')[1],
        values = values.split(')')[0],
        values = values.split(',');

       var a = values[0]; 
       var b = values[1]; 
       var c = values[2]; 
       var d = values[3]; 
	   var tx = values[4]; 
	   var ty = values[5]; 
	   
		x=tx;
		
		y=ty;
		
		angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		
		scale = Math.sqrt(a*a + b*b);
		
		}
		
		
		//Get X//
		
			if("x" in params){	
	   
			transform+="translateX("+params.x+"px) ";
			
			flags.push(1);
		
			}else{
				
				
		
		            if(tr !== "none"){
			       		
						 transform+="translateX("+x+"px) ";
						 
					} else{
						
						transform+="translateX(0px) ";
						
					}
					
					flags.push(0);
	
			}
			
			//Get Y//
		
			if("y" in params){	
			
			
	   
			transform+="translateY("+params.y+"px) ";
			
			flags.push(1);
		
			}else{
		
		            if(tr !== "none"){
			       		
						 transform+="translateY("+y+"px) ";
						 
					} else{
						
						transform+="translateY(0px) ";
						
					}
					
					flags.push(0);
	
			}
			
			//Get Scale//
		
			if("scale" in params){	
	   
			transform+="scale("+params.scale+","+params.scale+") ";
			
			flags.push(1);
		
			}else{
		
		            if(tr !== "none"){
			       		
						 transform+="scale("+scale+","+scale+") ";
						 
					} else{
						
						transform+="scale(1,1) ";
						
					}
					
					flags.push(0);
	
			}
			
			//Get Rotate//
		
			if("rotate" in params){	
	   
			transform+="rotate("+params.rotate+"deg) ";
			
			flags.push(1);
		
			}else{
		
		            if(tr !== "none"){
			       		
						 transform+="rotate("+angle+"deg) ";
						 
					} else{
						
						transform+="rotate(0deg) ";
						
					}
					
					flags.push(0);
	
			}
			
			//Get Alpha//
		
			if("alpha" in params){	
			
			flags.push(1);
	   
			alpha=params.alpha;
		
			}else{
				
			flags.push(0);
						
			alpha=opacity;
	
			}
			
			//Get Visible//
		
			if("visible" in params){	
			
			flags.push(1);
	   
			visible=params.visible;
		
			}else{
				
			flags.push(0);
						
			visible=vis;
	
			}
			
			//Get Ease//
			
			if("ease" in params){
				
				switch(params.ease) {
					
					//ease
					
					case "easeIn":  easing="cubic-bezier(0.420, 0.000, 1.000, 1.000)"; break;
					
					case "easeOut":  easing="cubic-bezier(0.000, 0.000, 0.580, 1.000)"; break;
					
					case "easeInOut":  easing="cubic-bezier(0.420, 0.000, 0.580, 1.000)"; break;
					
					//Quad
					
					case "easeInQuad":  easing="cubic-bezier(0.550, 0.085, 0.680, 0.530)"; break;
					
					case "easeOutQuad":  easing="cubic-bezier(0.250, 0.460, 0.450, 0.940)"; break;
					
					case "easeInOutQuad":  easing="cubic-bezier(0.455, 0.030, 0.515, 0.955)"; break;
					
					//Cubic
					
					case "easeInCubic":  easing="cubic-bezier(0.550, 0.055, 0.675, 0.190)"; break;
					
					case "easeOutCubic":  easing="cubic-bezier(0.215, 0.610, 0.355, 1.000)"; break;
					
					case "easeInOutCubic":  easing="cubic-bezier(0.645, 0.045, 0.355, 1.000)"; break;
					
					//Quart
					
					case "easeInQuart":  easing="cubic-bezier(0.895, 0.030, 0.685, 0.220)"; break;
					
					case "easeOutQuart":  easing="cubic-bezier(0.165, 0.840, 0.440, 1.000)"; break;
					
					case "easeInOutQuart":  easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)"; break;
					
					//Quint
					
					case "easeInQuint":  easing="cubic-bezier(0.755, 0.050, 0.855, 0.060)"; break;
					
					case "easeOutQuint":  easing="cubic-bezier(0.230, 1.000, 0.320, 1.000)"; break;
					
					case "easeInOutQuint":  easing="cubic-bezier(0.860, 0.000, 0.070, 1.000)"; break;
					
					//Sine
					
					case "easeInSine":  easing="cubic-bezier(0.470, 0.000, 0.745, 0.715)"; break;
					
					case "easeOutSine":  easing="cubic-bezier(0.390, 0.575, 0.565, 1.000)"; break;
					
					case "easeInOutSine":  easing="cubic-bezier(0.445, 0.050, 0.550, 0.950)"; break;
					
					//Expo
					
					case "easeInExpo":  easing="cubic-bezier(0.950, 0.050, 0.795, 0.035)"; break;
					
					case "easeOutExpo":  easing="cubic-bezier(0.190, 1.000, 0.220, 1.000)"; break;
					
					case "easeInOutExpo":  easing="cubic-bezier(1.000, 0.000, 0.000, 1.000)"; break;
					
					//Circ
					
					case "easeInCirc":  easing="cubic-bezier(0.600, 0.040, 0.980, 0.335)"; break;
					
					case "easeOutCirc":  easing="cubic-bezier(0.075, 0.820, 0.165, 1.000)"; break;
					
					case "easeInOutCirc":  easing="cubic-bezier(0.785, 0.135, 0.150, 0.860)"; break;
				}
				
				
			
			}else{
				
			easing="cubic-bezier(0.250, 0.250, 0.750, 0.750)";
			
			}
			
			//Done event//
			
			
			function done(){
				
				id.removeEventListener(transitionEnd, done);
				var  complete=params.complete;
				complete();
				complete=null;
				
			}
			
	if("complete" in params){
		
				id.addEventListener(transitionEnd, done);
	
	
	}
	
	
	if(duration===0){
			
	id.style.webkitTransition="-webkit-transform "+0.01+"s "+easing+", opacity "+0.01+"s "+easing+", visibility "+0.01+"s "+easing;
	id.style.MozTransition="-moz-transform "+0.01+"s "+easing+", opacity "+0.01+"s "+easing+", visibility "+0.01+"s "+easing;
	id.style.msTransition="-ms-transform "+0.01+"s "+easing+", opacity "+0.01+"s "+easing+", visibility "+0.01+"s "+easing;
	id.style.transition="transform "+0.01+"s "+easing+", opacity "+0.01+"s "+easing+", visibility "+0.01+"s "+easing;
	
	}else{
		
    id.style.webkitTransition="-webkit-transform "+dur+"s "+easing+", opacity "+dur+"s "+easing+", visibility "+dur+"s "+easing;
	id.style.MozTransition="-moz-transform "+dur+"s "+easing+", opacity "+dur+"s "+easing+", visibility "+dur+"s "+easing;
	id.style.msTransition="-ms-transform "+dur+"s "+easing+", opacity "+dur+"s "+easing+", visibility "+dur+"s "+easing;
	id.style.transition="transform "+dur+"s "+easing+", opacity "+dur+"s "+easing+", visibility "+dur+"s "+easing;
	
	}
	
	
	
	id.style.webkitTransform=transform;
	id.style.MozTransform=transform;
	id.style.msTransform=transform;
	id.style.transform=transform;
	id.style.opacity=alpha;	
	id.style.visibility=visible;	
		
	}
}