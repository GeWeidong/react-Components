import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Notice from './notice';
import './notice.scss';
/*
	NoticeManager用来管理Notice实例
 */
class NoticeManager extends Component {
	constructor(props){
		super(props);
		this.state = {
			notices: [],
			hasMask: false,
		};
	}
	add(noticeProps) {
		let {notices} = this.state;
		let key = noticeProps.key || +new Date;
		noticeProps.key = key;
		let newNotices = [...notices];
		let mask = noticeProps.mask;
		let len = notices.filter(v => v.key == key).length;

		if(len == 0){
			newNotices.push(noticeProps);
			this.setState({notices: newNotices, hasMask: mask});
		}
	}

	remove(key) {
		this.setState(previousState => ({notices: previousState.notices.filter(v => v.key != key)}))
		// 注意不能写成：this.setState(previousState => {notices: previousState.notices.filter(v => v.key != key)})
		// 返回一个对象的时候 ，需要包裹括号 fuck!
	}

	getNoticeDOM() {
		let result = [];
		const {notices} = this.state;
		notices.map(v => {
			const closeFun = () => {
				this.remove(v.key);
				this.props.onClose && this.props.onClose();
			}
			result.push(<Notice key={v.key} {...v} onClose={closeFun}/>) 
		})
		return result;
	}

	getMaskDOM() {
		if(this.state.notices.length > 0 && this.state.hasMask) {
			return <div className="mask"></div>
		}
		return null;
	}

	render() {
		const {prefixCls} = this.props;
		const {notices} = this.state;
		const maskDOM = this.getMaskDOM();
		const noticeDOM = this.getNoticeDOM();
		return (
			<div className={`${prefixCls}_noticeManager`}>
				{maskDOM}
				{notices.length > 0 && <div className="toast_wraper">{noticeDOM}</div>}
			</div>
		)
	}
}

NoticeManager.propTypes = {
	prefixCls: PropTypes.string,
}
NoticeManager.defaultProps = {
	prefixCls: 'gewd',
}

const Toast = {
	init: () => {
		let div = document.createElement('div');
		document.body.appendChild(div);
		this.notification = ReactDOM.render(<NoticeManager />, div);
	},
	show: (content, mask=false, iconClass, onClose, duration) => {
		this.notification.add({content, mask, iconClass, onClose, duration});
	},
}
Toast.init()

export default Toast;