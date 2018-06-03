import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListTitle from '@/pages/components/listTitle';
import Carousel from '@/components/carousel';

const carouselData = [
    {content: 'Figure1', style: {'textAlign': 'center', 'fontSize': '1rem', 'lineHeight': '4rem', 'color': '#fff', 'background': '#26a69a'}},
    {content: 'Figure2', style: {'textAlign': 'center', 'fontSize': '1rem', 'lineHeight': '4rem', 'color': '#fff', 'background': '#ff751f'}},
    {content: 'Figure3', style: {'textAlign': 'center', 'fontSize': '1rem', 'lineHeight': '4rem', 'color': '#fff', 'background': '#ff751f'}},
    {content: <img src={'https://tse1-mm.cn.bing.net/th?id=OET.ec175604c82c48ff9fea1e26b19636d2&w=272&h=135&c=7&rs=1&o=5&pid=1.9'} style={{width: '100%', height: '100%'}}/>}
];

export default class CarouselPage extends Component {
	constructor(props){
		super(props);

	}

	render() {
		return (
			<div className="poge button">
				<h1 className="title">
					Carousel
				</h1>

				<div className="carousel-box">
					<Carousel
						data={carouselData}
						loopFromStart={false}
						startIndex={1}
						autoplay={false}
					 />
					 <h3>无缝轮播</h3>
					 <Carousel
						data={carouselData.slice(0, 3)}
						loopFromStart={true}
						startIndex={1}
						autoplay={false}
					 />
				</div>
			</div>
		)
	}
}
