/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import "../Varient.css";
import "./Varient2.css";
import { Link } from "react-router-dom";

const SubcardV2_2 = ({ item }) => {
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
    <>
      <div className="col-md-6 mb-3">
        <Card className="border-0">
          <Link className="link-style" to={`/post/${item.title_slug}`}>
            <Card.Body>
              <div className="row">
                <div className="col-6">
                  <div className="image-container">
                    <Card.Img
                      variant="top"
                      src={`${import.meta.env.VITE_BACKEND_URL}${
                        item.image_mid
                      }`}
                      className="varient-image"
                      style={{
                        aspectRatio: "16/9",
                        objectFit: "cover",
                        borderRadius: 0,
                      }}
                    />
                  </div>
                </div>
                <div className="col-6 mt-2">
                  <div className="content-card2">
                    <h6 className="card-heading">
                      {item.title.length > 40
                        ? `${item.title.slice(0, 40)}...`
                        : item.title}
                    </h6>
                    <Card.Text>{formatDate(item.created_at)}</Card.Text>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Link>
        </Card>
      </div>
    </>
  );
};

export default SubcardV2_2;
