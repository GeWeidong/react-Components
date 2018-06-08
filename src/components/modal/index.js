import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ModalPortal from './ModalPortal';
import './modal.scss';

export default class Modal extends Component {
	constructor(props){
		super(props);
		this.state = {selfShow: false}
		this.destoryModal = this.destoryModal.bind(this);
	}

	componentDidMount() {
		this.modalTarget = document.createElement('div');
		document.body.appendChild(this.modalTarget);
		this.renderModal();
	}

	componentDidUpdate() {
		this.renderModal();
	}

	componentWillReceiveProps(nextProps, nextState) {
		if(!nextProps.show) {
			if(nextProps.animationName != ''){
				setTimeout(() => {
					this.setState({selfShow: false})
				}, 300)
			}else{
				this.setState({selfShow: false});
			}
		}else{
			this.setState({selfShow: true});
		}
	}

	componentWillunmount() {
		this.destoryModal();
	}

	destoryModal() {
		const {animationName} = this.props;
		if(animationName != ''){
			setTimeout(() => {
				this.setState({selfShow: false})
			}, 300)
		}else{
			this.setState({selfShow: false});
		}
	}

	renderModal() {
		ReactDOM.unstable_renderSubtreeIntoContainer(
				this,
				<div style={{display: (this.props.show || this.state.selfShow) ? 'block' : 'none'}}><ModalPortal destory={this.destoryModal} {...this.props} /></div>,
				this.modalTarget
			)
	}
	
	render() {
		return null;
	}
}

Modal.propTypes = {
	prefixCls: PropTypes.string, 
    hasMask: PropTypes.bool,
    animationName: PropTypes.string,
    closeModal: PropTypes.func,
    clickMaskDestory: PropTypes.bool,
}

Modal.defaultProps = {
	prefixCls: 'gewd',
    hasMask: true,
    animationName: 'zoom',
    closeModal: ()=>{},
    clickMaskDestory: true,
}
