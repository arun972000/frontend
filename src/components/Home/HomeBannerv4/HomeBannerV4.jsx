
import { Row, Col } from 'react-bootstrap';
import "./HomeBannerV4.css";

import SliderImageV4 from './Sliderv4';




const HomeBannerV4 = () => {

   
 

    return (

        <Row className="g-2 mb-4">

            <Col sm={12}>
                <SliderImageV4 />
            </Col>

        </Row>

    );
};

export default HomeBannerV4;