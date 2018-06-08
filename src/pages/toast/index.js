import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListTitle from '@/pages/components/listTitle';
import Button from '@/components/button';
import Toast from '@/components/toast/NoticeManager';
import './toastPage.scss';

export default class ToastPage extends Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<div className="poge button">
				<h1 className="title">
					Toast
				</h1>

				<ListTitle title="基本" />

				<Button onClick={()=> Toast.show('warring', true, 'icon_class')}>带图标 带遮罩</Button>
				<Button onClick={()=> Toast.show('忘记你我做不到')}>不带图标 不带遮罩</Button>
				<Button onClick={()=> Toast.show('warring', false, 'icon_class')}>带图标 不带遮罩</Button>
				<Button onClick={()=> Toast.show('妈的', true)}>不带图标 带遮罩</Button>
			</div>
		)
	}
}
