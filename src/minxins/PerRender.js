import {shallowEqual} from '@/utils/object';

export default (Component) => {
	Component.prototype.shouldComponentUpdate = (nextProps, nextState) => {
		return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	}
	// 测试属性
	Component.prototype.gewd = 'geweidong';

	return Component;
}

// minxins模式会破坏原有组件的封装