import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

import List from '@/components/list';

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	componentDidMount() {
	}

	gotoPage(path) {
		this.props.history.push(`/${path}`)
		// console.log(this.props)
	}

	render() {
		return (
			<div className="home_container">
				<List renderFooter={'末尾数据'} renderHeader={'数据输入'}>
					<List.Item extra="Button" onClick={this.gotoPage.bind(this, 'buttons')}>按钮</List.Item>
					<List.Item extra="Switch">滑动按钮</List.Item>
					<List.Item extra="DatePicker">日期选择器</List.Item>
					<List.Item extra="Picker">选择器</List.Item>
					<List.Item extra="Carsoul">轮播图</List.Item>
				</List>
			</div>
		)
	}
}

export default Home;