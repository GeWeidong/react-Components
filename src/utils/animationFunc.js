const animationFunc = (obj, style, time, callback) => {
	let objStyle = obj.style;
	let diffObj = {};
	let step = 20, interVal = time / step, num = 0;

	for(let k in style){
		diffObj[k] = (Number.parseFloat(style[k]) - Number.parseFloat(objStyle[k])) / interVal;
	}
	const timer = setInterval(() => {
		if(num < interVal){
			for(let k in diffObj){
				objStyle[k] = Number.parseFloat(objStyle[k]) + diffObj[k] + 'px';
			}
			num ++;
		}else{
			clearInterval(timer);
			callback && callback();
		}
		
	}, step)
}

export default animationFunc;