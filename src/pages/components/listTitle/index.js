import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './listTitle.scss';

const ListTitle = ({title, align}) => {
	// align是对齐方式
	return (
		<div className={`list-title ${align}`}>{title}</div>
	)
}

ListTitle.propsType = {
	title: PropTypes.string.isRequired,
	align: PropTypes.oneOf(['left', 'center', 'right']),
}

ListTitle.defaultProps = {
	align: 'left',
}

export default ListTitle;