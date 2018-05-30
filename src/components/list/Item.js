import React, {Component} from 'react';
import './item.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Touchable from 'rc-touchable'

const Item = (props) => {
	const {prefixCls, className, activeClassName, thumb, extra, subtitle, arrow, wrap, disabled, onClick, children, ...resProps} = props;
	const classNames = classnames(prefixCls, className);

	return (
		<Touchable
			disabled={disabled}
			onPress={onClick}
			activeClassName={(onClick && !disabled) ? activeClassName : ''}
		>
			<div className={classNames}>
				{
					typeof children == 'object' ?
					<div className={`${prefixCls}-content`}>
						{children}
					</div> :
					<div className={`${prefixCls}-content`}>
						{children}
						{subtitle ? <div className={`${prefixCls}-subtitle`}>{subtitle}</div> : null}
					</div>
				}
				{extra ? <div className={`${prefixCls}-extra`}>{extra}</div> : null}
				{arrow ? <div className={`${prefixCls}-arrow`}>
					<span className={classnames({
						'arrow-horizontal': arrow == 'horizontal',
						'arrow-up': arrow == 'up',
						'arrow-down': arrow == 'down',
					})}></span>
				</div> : null}
			</div>
		</Touchable>
	)
}

Item.propTypes = {
	prefixCls: PropTypes.string, // 前缀class
    className: PropTypes.string, // 自定义class
    activeClassName: PropTypes.string, // 点击效果class
    thumb: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), // 缩略图
    extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), // 右侧的内容
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), // 列表项的副标题
    arrow: PropTypes.oneOf(['horizontal', 'up', 'down']), // 列表项的箭头 枚举
    wrap: PropTypes.bool, // 超出文字是否会被隐藏
    disabled: PropTypes.bool, // 列表项不可点击
    onClick: PropTypes.func, // 列表项点击回调事件
}

Item.defaultProps = {
	prefixCls: 'gewd-item',
    activeClassName: 'gewd-item-active',
    wrap: true,
    disabled: false,
    arrow: 'horizontal'
}

export default Item;
