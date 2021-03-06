import React, {Component, findDOMNode} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Hammer from 'hammerjs';
import './carousel.scss';
import animationFunc from '@/utils/animationFunc';

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
	// 自动轮播的规则
	changeFegiruIndex() {
		const list = this.refs.list;
		const {startFegiruIndex, data, loopData} = this.state;
		const {loopFromStart, onFigureChange} = this.props;
		let newIndex = startFegiruIndex + 1;
		let len = data.length;
		if(startFegiruIndex >= len-1) {newIndex = 0};
		animationFunc(list, {'left': loopFromStart ? -2*this.carouselWidth + 'px' : -this.carouselWidth * newIndex + 'px'}, 300, () => {
			if(loopFromStart){
				// 如果无缝滚动，滚动完，切换data并且left值复位 只有三个 置于中间
				this.setState({startFegiruIndex: newIndex, loopData: this.getLoopData(true, newIndex)})
				list.style.left = -this.carouselWidth + 'px';
			}else{
				this.setState({startFegiruIndex: newIndex})
			}
			// callback 
			onFigureChange && onFigureChange(newIndex);
		})
	}
	// 手势系统
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
			clearInterval(this.autoplayTimer);
			startPosition = e.deltaX;
			currentLeft = Number.parseFloat(domList.style.left);
		})
		listHammer.on('panmove', (e)=>{
			domList.style.left = this.getMovePosition(e.deltaX - startPosition, currentLeft) + 'px';
		})
		listHammer.on('panend', (e)=>{
			let moveDis = e.deltaX - startPosition;
			const listDOM = this.refs.list;
			const {startFegiruIndex} = this.state;

			if(!loopFromStart){
				if(moveDis <= Number.parseFloat(-this.carouselWidth / 2)){
					// 向左滑超过1/2
					const nextIndex = this.getNextIndex(true);
		
					animationFunc(listDOM, {'left': -this.carouselWidth * nextIndex + 'px'}, 300, () => {
						this.setState({startFegiruIndex: nextIndex});
						this.autoplay();
					})
				}
				// 如果左滑移动距离不够  归位
				if(Number.parseFloat(-this.carouselWidth / 2) < moveDis && moveDis <= 0){
					animationFunc(listDOM, {'left': -this.carouselWidth * startFegiruIndex + 'px'}, 300, () => {
						this.autoplay();
					});
				}
				if(moveDis >= Number.parseFloat(this.carouselWidth / 2)){
					// 向右滑超过1/2
					const nextIndex = this.getNextIndex(false);
		
					animationFunc(listDOM, {'left': -this.carouselWidth * nextIndex + 'px'}, 300, () => {
						this.setState({startFegiruIndex: nextIndex});
						this.autoplay();
					})
				}
				// 如果右滑移动距离不够  归位
				if(moveDis > 0 && moveDis < Number.parseFloat(this.carouselWidth / 2)){
					animationFunc(listDOM, {'left': -this.carouselWidth * startFegiruIndex + 'px'}, 300, () => {
						this.autoplay();
					});
				}
			}else{
				// 无限循环
				if(moveDis <= Number.parseFloat(-this.carouselWidth / 2)){
					const nextIndex = this.getNextIndex(true);
					animationFunc(listDOM, {'left': -this.carouselWidth * 2 + 'px'}, 300, () => {
						this.setState({startFegiruIndex: nextIndex, loopData: this.getLoopData(true, nextIndex)});
						listDOM.style.left = -this.carouselWidth + 'px';
						this.autoplay();
					})
				}
				if(moveDis < 0 && moveDis >= Number.parseFloat(-this.carouselWidth / 2)){
					animationFunc(listDOM, {'left': -this.carouselWidth + 'px'}, 300, () => {
						this.autoplay();
					})
				}
				if(moveDis >= Number.parseFloat(this.carouselWidth / 2)){
					// 向右滑超过1/2
					const nextIndex = this.getNextIndex(false);
			
					animationFunc(listDOM, {'left': 0 + 'px'}, 300, () => {
						this.setState({startFegiruIndex: nextIndex, loopData: this.getLoopData(true, nextIndex)});
						listDOM.style.left = -this.carouselWidth + 'px';
						this.autoplay();
					})
				}
				// 如果右滑移动距离不够  归位
				if(moveDis > 0 && moveDis < Number.parseFloat(this.carouselWidth / 2)){
					animationFunc(listDOM, {'left': -this.carouselWidth + 'px'}, 300, () => {
						this.autoplay();
					});
				}
			}
		})
	}
	// 得到下一个index 
	getNextIndex(plus) {
		const currentIndex = this.state.startFegiruIndex;
		const {loopFromStart} = this.props;
		const len = this.state.data.length;
		let nextIndex = 0;

		if(plus) {
			if(currentIndex == len - 1) {nextIndex = (loopFromStart ? 0 : len - 1); return nextIndex;}
			nextIndex = currentIndex + 1;
			return nextIndex;
		}else{
			if(currentIndex == 0) {nextIndex = (loopFromStart ? len - 1 : 0); return nextIndex;}
			nextIndex = currentIndex - 1;
			return nextIndex;
		}
	}
	// 跟手滑动限制
	getMovePosition(moveDis, currentDis) {
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
	// list style
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
	// list dom
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
	// 点点
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
    intervalTime: 3000,
    loopFromStart: true,
    dots: true,
    swipe: true,
}
