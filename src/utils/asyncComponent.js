import React, { Component } from "react";
// 动态引入,代码分割的其中之一实现方式 https://www.colabug.com/1610907.html
const asyncComponent = (imComponent) => {
	return class extends Component {
		constructor(props){
			super(props);
			this.state = {component: null}
		}

		async componentDidMount() {
			const {default: component} = await imComponent();
			this.setState({component})
		}

		render() {
			const ComponentOut = this.state.component;

			return ComponentOut ? <ComponentOut {...this.props}/> : null;
		}
	}
}

export default asyncComponent;