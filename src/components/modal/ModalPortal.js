import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './modal.scss';

export default class ModalPortal extends Component {
	constructor(props){
		super(props);
		this.state = {
			showModal: props.show,
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({showModal: nextProps.show})
	}

	render() {
		const {hasMask, prefixCls, animationName, clickMaskDestory} = this.props;
		const {showModal} = this.state;

		const classNames = classnames('children-box', animationName, {
			'enter': showModal,
			'leave': !showModal,
		})

		const handleMask = clickMaskDestory ? () => {this.props.closeModal()} : null;

		const resultDom = <div className={`${prefixCls}-modal`} ref={ref=>this.container=ref}>
					{hasMask && <div className="mask" onClick={handleMask}></div>}
					<div className={classNames}>{this.props.children}</div>
				</div>;

		return resultDom;  
	}
}

