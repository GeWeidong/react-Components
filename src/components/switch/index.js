import React, {Component} from 'react';
import Touchable from 'rc-touchable';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './switch.scss';

export default class Switch extends Component {
	constructor(props){
		super(props);

		let checked = true;
		if('checked' in props && props.checked !== undefined){
			checked = props.checked;// 受控组件
		}else{
			checked = props.defaultChecked;// 非受控
		}

		this.state = {
			checked
		}

		this.toggleStatus = this.toggleStatus.bind(this);
	}

	toggleStatus() {
		let checkSt = this.props.checked !== undefined ? !this.props.checked : !this.state.checked;
		if(!('checked' in this.props && this.props.checked !== undefined)){
			this.setState({checked: checkSt});
		}else{
			// 受控组件
			this.props.onChange(checkSt);
		}
	}

	renderTextDom() {
		const {attachedText} = this.props;
		const {checked} = this.props.checked !== undefined ? this.props : this.state;
		if(!attachedText || attachedText.length < 2) return null;
	
		return [
			<div className={`text-left ${checked ? 'checked' : ''}`} key="a">{attachedText[0]}</div>,
			<div className={`text-right ${checked ? 'checked' : ''}`} key="b">{attachedText[1]}</div>
		]
		return null;
	}

	render() {
		const {prefixCls, theme, defaultChecked, attachedText, disabled, onChange} = this.props;
		const {checked} = this.props.checked !== undefined ? this.props : this.state;

		const classNames = classnames([prefixCls, {
			'ios': theme == 'iOS',
			'android': theme == 'android',
			'disabled': disabled,
		}]);
		const attachedTextDom = this.renderTextDom();
		return (
			<div className={classNames}>
			    <label>
			    	<input disabled={disabled} checked={checked} onClick={this.toggleStatus} className={`${prefixCls}-switch ${prefixCls}-switch-anim`} type="checkbox" />
			    	{attachedTextDom}
			    </label>
			</div>
		)
	}
}

Switch.propsType = {
	prefixCls: PropTypes.string,
	theme: PropTypes.oneOf(['iOS', 'android']), // 主题 枚举 iOS风格和Android风格
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    // attachedText: PropTypes.array,
    onChange: PropTypes.func,
}

Switch.defaultProps = {
	prefixCls: 'gewd-switch',
	theme: 'iOS',
    defaultChecked: true,
    onChange: ()=>{},
}