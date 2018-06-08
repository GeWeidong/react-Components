import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListTitle from '@/pages/components/listTitle';
import Button from '@/components/button';
import Modal from '@/components/modal';
import './modalPage.scss';

export default class ModalPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			modalShow: false,
			modalShow1: false,
			modalShow2: false,
			modalShow3: false,
		}

		this._closeModal1 = this._closeModal1.bind(this);
		this._closeModal2 = this._closeModal2.bind(this);
		this._closeModal3 = this._closeModal3.bind(this);
	}

	_closeModal1() {
		if(this.state.modalShow1){
			this.setState({
				modalShow1: false
			})
		}
	}

	_closeModal2() {
		if(this.state.modalShow2){
			this.setState({
				modalShow2: false
			})
		}
	}

	_closeModal3() {
		if(this.state.modalShow3){
			this.setState({
				modalShow3: false
			})
		}
	}

	render() {
		return (
			<div className="poge button">
				<h1 className="title">
					button
				</h1>

				<ListTitle title="基本 没有动画" />
				<Button className={'modal_btn'} onClick={()=>this.setState({modalShow1: true})}>基本 没有动画</Button>
				<Modal 
					show={this.state.modalShow1}
					closeModal={this._closeModal1}
					animationName={''}
					>
					<div className="modal-demo">
						<button onClick={()=>{this._closeModal1()}}>点击关闭</button>
					</div>
				</Modal>

				<ListTitle title="zoom动画 点击遮罩关闭" />
				<Button className={'modal_btn'} onClick={()=>this.setState({modalShow2: true})}>zoom动画 点击遮罩关闭</Button>
				<Modal 
					show={this.state.modalShow2}
					closeModal={this._closeModal2}
					animationName={'zoom'}
					>
					<div className="modal-demo">
						<button onClick={()=>{this._closeModal2()}}>点击关闭</button>
					</div>
				</Modal>

				<ListTitle title="bounce动画 没有遮罩" />
				<Button className={'modal_btn'} onClick={()=>this.setState({modalShow3: true})}>zobounce动画 没有遮罩</Button>
				<Modal 
					show={this.state.modalShow3}
					hasMask={false}
					animationName={"bounce"}
					closeModal={this._closeModal3}
					>
					<div className="modal-demo">
						<button onClick={()=>{this._closeModal3()}}>点击关闭</button>
					</div>
				</Modal>
			</div>
		)
	}
}
