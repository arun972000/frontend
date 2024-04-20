/* eslint-disable react/prop-types */

import Card from "react-bootstrap/Card";
import "../Varient.css";
import { Link } from "react-router-dom";

const SubCardV5_1 = ({ item }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <Card className="mb-1 border-0 mb-3">
      <Link className="link-style" to={`/post/${item.title_slug}`}>
        <Card.Body>
          <div className="row">
            <div className="col-6">
              <div className="image-container">
                <Card.Img
                  variant="top"
                  src={`${import.meta.env.VITE_BACKEND_URL}${item.image_mid}`}
                  className="varient-image"
                  style={{
                    aspectRatio: "16/9",
                    objectFit: "cover",
                    borderRadius: 0,
                  }}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="content">
                <h6 className="card-heading">
                  {item.title.length > 40
                    ? `${item.title.slice(0, 40)}...`
                    : item.title}
                </h6>

                <p className="card-text small">{formatDate(item.created_at)}</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default SubCardV5_1;
