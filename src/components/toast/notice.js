import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './notice.scss';

export default class Notice extends Component {
	constructor(props){
		super(props);
		this.state = {
			shouldClose: false,
		}
	}

	componentDidMount() {
		this.closeTimer = setTimeout(() => {
			this.close();
		}, this.props.duration - 300)
	}

	componentWillunmount() {
		clearInterval(this.closeTimer);
		clearInterval(this.removeTimer);
		this.closeTimer = null;
		this.removeTimer = null;
	}

	close() {
		clearInterval(this.closeTimer);
		this.closeTimer = null;
		this.setState({shouldClose: true});
		this.removeTimer = setTimeout(() => {
			this.props.onClose && this.props.onClose();
		}, 300)
	}

	render() {
		const {shouldClose} = this.state;
		const {type, prefixCls, content, iconClass} = this.props;
		
		const classNames = classnames(`${prefixCls}_notice`, {
			'info':    type == 'info',
			'success': type == 'success',
			'warning': type == 'warning',
			'error':   type == 'error',
			'leave':   shouldClose,
		})
		return <div className={classNames}>
			{iconClass && <div className={iconClass}></div>}
			<div className="content">{content}</div>
		</div>
	}
}

Notice.propTypes = {
	duration: PropTypes.number.isRequired, // Notice显示时间
    prefixCls: PropTypes.string, // 前缀class
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']), // notice类型   暂时先不加 没意义
    iconClass: PropTypes.string, // icon的class
    content: PropTypes.any, // Notice显示的内容
    onClose: PropTypes.func // 显示结束回调
}

Notice.defaultProps = {
	duration: 3000,
	prefixCls: 'gewd',
	type: 'info',
	onClose: () => {},
}