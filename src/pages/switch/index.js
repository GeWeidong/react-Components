import React, {Component} from 'react';
import Touchable from 'rc-touchable';
import PropTypes from 'prop-types';
import ListTitle from '@/pages/components/listTitle';
import Switch from '@/components/switch';
import List from '@/components/list';

export default class SwitchPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			checked: false,
		}

		this.toggleChecked = this.toggleChecked.bind(this);
	}

	toggleChecked(type) {
		console.log(type);
		this.setState({checked: type});
	}

	render() {
		const {checked} = this.state;

		return (
			<div className="poge switch">
				<h1 className="title">
					switch
				</h1>

				<List>
					<List.Item extra={<Switch theme={'android'}/>}>安卓风格</List.Item>
					<List.Item extra={<Switch onChange={this.toggleChecked} checked={checked} theme={'android'}/>}>安卓受控</List.Item>
					<List.Item extra={<Switch theme={'iOS'}/>}>ios风格</List.Item>
					<List.Item extra={<Switch onChange={this.toggleChecked} checked={checked} theme={'iOS'}/>}>iOS受控</List.Item>
					<List.Item extra={<Switch disabled={true} theme={'android'}/>}>安卓禁用</List.Item>
					<List.Item extra={<Switch disabled={true} theme={'iOS'}/>}>ios禁用</List.Item>
					<List.Item extra={<Switch attachedText={['开', '关']} theme={'android'}/>}>安卓文字</List.Item>
					<List.Item extra={<Switch attachedText={['on', 'off']} theme={'iOS'}/>}>ios文字</List.Item>
				</List>
			</div>
		)
	}
}

SwitchPage.propsType = {

}

SwitchPage.defaultProps = {

}