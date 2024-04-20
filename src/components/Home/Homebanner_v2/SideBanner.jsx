/* eslint-disable react/prop-types */
import "./HomeBannerV2.css";
import { Col } from "react-bootstrap";

const SideBanner = ({ item }) => {
  {
    console.log(item);
  }
  return (
    <Col xs={6} className="mt-2">
      <div
        className="nested-column banner__hover"
        style={{ position: "relative" }}
      >
        <img
          className="d-block w-100 sideBanner_image"
          src={`${import.meta.env.VITE_BACKEND_URL}${item.image_small}`}
          alt={item.title}
          style={{ aspectRatio: "16/9", objectFit: "fill" }}
        />
        <div className="home__overlay--text">
          <h6>{item.title.slice(0, 80)}</h6>
          <p>Date Posted: {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </Col>
  );
};

export default SideBanner;
