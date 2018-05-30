
// 对象浅比较 
const shallowEqual = (objA, objB) => {
	if (objA === objB) {
	    return true
	}

	if (typeof objA !== 'object' || objA === null ||
	    typeof objB !== 'object' || objB === null) {
	    return false
	}

	if(Object.keys(objA).length !== Object.keys(objB)){
		return false;
	}

	Object.keys(objA).forEach((v, i) => {
		if(!objB.hasOwnProperty(v) || v !== objB[v]) {
			return false;
		}
	})

	return true;
}

export {
	shallowEqual,
}