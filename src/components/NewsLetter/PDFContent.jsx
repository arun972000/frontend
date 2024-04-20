import { useEffect, useState } from "react";

import "./PDFcontent.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Url } from "../../url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import HTMLFlipBook from "react-pageflip";
import img1 from "/src/assets/sample/Artboard 2 copy 2.png";
import img2 from "/src/assets/sample/Artboard 2 copy 3.png";
import img3 from "/src/assets/sample/Artboard 2 copy 5.png";
import img4 from "/src/assets/sample/Artboard 2 copy 6.png";
import img5 from "/src/assets/sample/Artboard 2 copy 7.png";
import img6 from "/src/assets/sample/Artboard 2 copy 8.png";

const PdfContent = () => {
  const { title } = useParams();
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/newsletter/data/${title}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <>
      <HTMLFlipBook width={400} height={600} className="mt-4">
        <div className="demo"></div>
        <div className="demo">
          <div>
            <img src={img2} width={400} height={600} />
          </div>
        </div>
        <div className="demo">
          <div>
            <img src={img3} width={400} height={600} />
          </div>
        </div>
        <div className="demo">
          <div>
            <img src={img4} width={400} height={600} />
          </div>
        </div>
        <div className="demo">
          <div>
            <img src={img5} width={400} height={600} />
          </div>
        </div>
        <div className="demo">
          <div>
            <img src={img6} width={400} height={600} />
          </div>
        </div>
      </HTMLFlipBook>
    </>
  );
};

export default PdfContent;
