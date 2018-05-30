import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListTitle from '@/pages/components/listTitle';
import Button from '@/components/button';

export default class ButtonPage extends Component {
	constructor(props){
		super(props);

	}

	render() {
		return (
			<div className="poge button">
				<h1 className="title">
					button
				</h1>

				<ListTitle title="基本" />

				<div className="button-box">
					<Button>基本default</Button>
					<Button disabled>disabled按钮</Button>
					<Button type={'primary'}>primary</Button>
					<Button disabled type={'primary'}>primary disabled</Button>
					<Button type={'ghost'}>ghost</Button>
					<Button disabled type={'ghost'}>ghost disabled</Button>
					<Button disabled loading type={'primary'}>primary loading</Button>
				</div>
			</div>
		)
	}
}
