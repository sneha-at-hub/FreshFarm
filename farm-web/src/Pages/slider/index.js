import React, { useContext } from 'react';
import Slider from "react-slick";
import './index.css';

import Slide1 from '../../assets/images/slider-1.png';
import Slide2 from '../../assets/images/slider-2.png';
import Button from '@mui/material/Button';

import { MyContext } from '../../App';

const HomeSlider = () => {
    const context = useContext(MyContext);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: context.windowWidth > 992 ? true : false,
        autoplay: true
    };

    return (
        <section className='homeSlider'>
            <div className='container-fluid position-relative'>
                <Slider {...settings} className='home_slider_Main'>
                    <div className="item">
                    <img src={Slide1} className='w-100' alt="Slide 1" style={{ height: '500px' }} />

                        <div className='info'>
                            <h2 className="mb-4">
                                Don’t miss amazing<br />
                                grocery deals
                            </h2>
                            <p>Shop Now with Free Delivery</p>
                        </div>
                    </div>
                    <div className="item">
                        <img src={Slide2} className='w-100' alt="Slide 2" style={{ height: '500px'}} />
                        <div className='info'>
                            <h2 className="mb-3">
                                Fresh Vegetables<br />
                                Big discount
                            </h2>
                            <p>Get worth Rs 100 Voucher on New Deals</p>
                            
                        </div>
                    </div>
                </Slider>

                {context.windowWidth > 992 && (
                    <div className="newsletter">
                        <input type='text' placeholder='Your email address' />
                        <Button variant="contained" color="primary">Subscribe</Button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default HomeSlider;
