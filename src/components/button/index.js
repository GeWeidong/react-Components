import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Touchable from 'rc-touchable';
import classnames from 'classnames';
import './button.scss';

const Button = (props) => {
	const {prefixCls, type, disabled, loading, activeClassName, className, onClick, children} = props;
	const classNames = classnames(prefixCls, className, type, {'disabled': disabled, 'loading': loading});
	return (
		<Touchable onPress={onClick} activeClassName={!disabled ? activeClassName : ''}>
			<a className={classNames}>
				{loading && <div className="loading"></div>}
				<span className={`${prefixCls}-text`}>{children}</span>
			</a>
		</Touchable>
	)
}

Button.propsType = {
	prefixCls: PropTypes.string, // 前缀class
    type: PropTypes.oneOf(['default', 'primary', 'ghost']), // 类型 枚举 有 default（白底黑字） primary（绿底白字） ghost（白底绿字） 三种
    disabled: PropTypes.bool, // 是否不可点击 不可点击时 样式会有调整 默认false
    loading: PropTypes.bool, // 是否显示loading loading时候按钮显示loading icon并且不可点击
    activeClassName: PropTypes.string, // 点击时候的类名
    className: PropTypes.string, // 自定义class
    onClick: PropTypes.func, // 点击的回调函数
}

Button.defaultProps = {
	prefixCls: 'gewd-btn',
	activeClassName: 'gewd-btn-active',
	type: 'default',
	disabled: false,
	loading: false,
}

export default Button;