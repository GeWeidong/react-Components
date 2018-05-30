import React, {Component} from 'react';
import './list.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Item from './Item';

const List = (props) => {
	const {prefixCls, className, renderHeader, renderFooter, children, ...restProps} = props;
	const classNames = classnames(prefixCls, className);
	return (
		<div className={classNames}>
			{renderHeader ? <div className={`${prefixCls}-header`}>
				{typeof renderHeader == 'function' ? renderHeader() : renderHeader}
			</div> : null}
			{children ? <div className={`${prefixCls}-body`}>{children}</div> : null}
			{renderFooter ? <div className={`${prefixCls}-footer`}>
				{typeof renderFooter == 'function' ? renderFooter() : renderFooter}
			</div> : null}
		</div>
	)
}

// 将Item组件作为List的属性，捆绑调用
List.Item = Item;

List.propTypes = {
	prefixCls: PropTypes.string,  // class前缀
	classNames: PropTypes.string, // class扩展
	renderHeader: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),  // 头部
	renderFooter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),  // 底部
}

List.defaultProps = {
	prefixCls: 'gewd-list',
}

export default List;