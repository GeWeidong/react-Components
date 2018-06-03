import React, {Component, findDOMNode} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Hammer from 'hammerjs';
import './carousel.scss';
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

export default class Carousel extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: props.data,
			loopData: [],         // 无缝轮播数据
			startFegiruIndex: 0,
		}
	}

	componentDidMount() {
		const {data, startIndex, swipe, autoplay, intervalTime, loopFromStart} = this.props;

		this.setState({
			loopData: loopFromStart ? this.getLoopData() : [],
			startFegiruIndex: startIndex ? startIndex : 0,
		})

		this.carouselWidth = this.refs.box.offsetWidth;

		if(autoplay) {this.autoplay()};

		if(swipe) {this.touchSwiper()};
	}
	componentWillUnmount() {
		this.carouselWidth = 0;
		clearInterval(this.autoplayTimer);
		this.autoplayTimer = null;
	}
	// 得到3个无限轮播的数组data
	getLoopData(loop, newIndex) {
		const {data} = this.state; 
		let index = loop ? newIndex : this.props.startIndex;
		let result = [];
		let len = data.length;
		if(len == 1) {
			result = [data[0], data[0], data[0]];
		}
		if(len == 2) {
			result = index == 0 ? [data[1], data[index], data[1]] : [data[0], data[index], data[0]];
		}
		if(len >= 3) {
			if(index == 0) {result = [data[len-1], data[index], data[index+1]]};
			if(index == len-1) {result = [data[len-2], data[index], data[0]]};
			if(index !== 0 && index !== len-1) {result = [data[index-1], data[index], data[index+1]]};
		}
		return result;
	}

	autoplay() {
		this.autoplayTimer = setInterval(() => {
			this.changeFegiruIndex();
		}, this.props.intervalTime)
	}
	// 自动轮播
	changeFegiruIndex() {
		const list = this.refs.list;
		const {startFegiruIndex, data, loopData} = this.state;
		const {loopFromStart, onFigureChange} = this.props;
		let newIndex = startFegiruIndex + 1;
		let len = loopFromStart ? loopData.length : data.length;
		if(startFegiruIndex >= len-1) {newIndex = 0}
		animationFunc(list, {'left': loopFromStart ? -2*this.carouselWidth + 'px' : -this.carouselWidth * newIndex + 'px'}, 300, () => {
			if(loopFromStart){
				// 如果无缝滚动，滚动完，切换data并且left值复位 只有三个 置于中间
				list.style.left = -this.carouselWidth + 'px';
				this.setState({startFegiruIndex: newIndex, loopData: this.getLoopData(true, newIndex)})
			}else{
				this.setState({startFegiruIndex: newIndex})
			}
			// callback 
			onFigureChange && onFigureChange(newIndex);
		})
	}

	touchSwiper() { 
		const {loopFromStart} = this.props;
		const domList = this.refs.list;
		const listHammer = new Hammer(domList);
		// 初始位置X
		let startPosition = 0;
		// 差异
		let diffPosition = 0;
		// 移动中的位置X
		let movePosition = 0;
		let currentLeft = 0;

		listHammer.on('panstart', (e)=>{
			startPosition = e.deltaX;
			currentLeft = Number.parseFloat(domList.style.left);
		})
		listHammer.on('panmove', (e)=>{
			domList.style.left = this.getMovePosition(e.deltaX - startPosition, currentLeft) + 'px';
		})
		listHammer.on('panend', (e)=>{
			if(!loopFromStart){
				if(moveDis <= Number.parseFloat(-this.carouselWidth / 2)){
					// 向左滑超过1/2
					animationFunc(listDOM, {'left':  + 'px' : -this.carouselWidth * newIndex + 'px'}, 300, () => {

					})
				}
			}
		})
	}

	getMovePosition(moveDis, currentDis) {
		console.log(moveDis)
		let result = currentDis + moveDis;
		if(!this.props.loopFromStart) {
			if(result >= 0) {
				result = result / 2;
			}else if(result <= -this.carouselWidth * (this.state.data.length - 1)){
				result = -this.carouselWidth * (this.state.data.length - 1) + moveDis / 2;
			}
		}else{
			// 不能划过一屏
			if(moveDis > this.carouselWidth){
				result = this.carouselWidth + currentDis;
			}else if(moveDis < -this.carouselWidth){
				result = -this.carouselWidth + currentDis;
			}
		}

		return result;
	}

	listStyle() {
		const {data, loopData, startFegiruIndex} = this.state;
		const {loopFromStart, startIndex} = this.props;
		const dataSource = loopFromStart ? loopData : data;
		if(this.carouselWidth){
			return {
				width: dataSource.length * 100 + '%', 
				height: '100%',
				left: loopFromStart ? -this.carouselWidth + 'px' : -startIndex*this.carouselWidth + 'px',
			};
		}else{
			return {
				width: dataSource.length * 100 + '%', 
				height: '100%',
				left: loopFromStart ? '-33.33%' : -this.carouselWidth + 'px',
			}
		}
	}

	listDOM()  {
		const {loopData, data} = this.state;
		const dataSource = this.props.loopFromStart ? loopData : data;

		return dataSource.map((v, i) => { 
			const style = v.style ? Object.assign({}, {width: 100 / dataSource.length + '%'}, v.style) : {width: 100 / dataSource.length + '%'};
			return (
				<div key={i} style={style} className="carsouel-item">
					{v.content}
				</div>
			)
		})
	}

	dotsDOM() {
		const {startFegiruIndex} = this.state;
		const {prefixCls, dots, data} = this.props;
		if(dots){
			return (
				<div className={`${prefixCls}-dotslist`}>
					{data.map((v, i) => {
						return <span className={startFegiruIndex == i ? 'active' : ''} key={i}></span>
					})}
				</div>			
			)
		}else{
			return null;
		}
	}

	render() {
		const {prefixCls} = this.props;
		const {startFegiruIndex} = this.state;
		const listStyle = this.listStyle();
		const listDOM = this.listDOM();
		const dotsDOM = this.dotsDOM();
		return (
			<div className={`${prefixCls}-carousel`} ref="box">
                <div
                    className={`${prefixCls}-list`} ref="list"
                    style={listStyle}
                >
                    {listDOM}
                </div>
                {dotsDOM}
            </div>
		)
	}
}

Carousel.propTypes = {
	prefixCls: PropTypes.string,           // 前缀class
    data: PropTypes.array,                 // 图片源数组
    startIndex: PropTypes.number,          // 初始位置
    autoplay: PropTypes.bool,              // 是否自动播放
    intervalTime: PropTypes.number,        // 循环播放时间差
    loopFromStart: PropTypes.bool,         // 是否从头循环
    dots: PropTypes.bool,                  // 是否显示底部指示点
    swipe: PropTypes.bool,                 // 是否可以滑动
    onFigureChange: PropTypes.func,        // 切换figure之后的回调函数
}

Carousel.defaultProps = {
	prefixCls: 'gewd',
    data: [],
    startIndex: 0,
    autoplay: true,
    intervalTime: 1000,
    loopFromStart: true,
    dots: true,
    swipe: true,
}
