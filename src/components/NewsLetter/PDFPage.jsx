import { useEffect, useState } from "react";
import PDFCard from "./PDFCard";
import "./scrollbar.css";
import axios from "axios";
import { Url } from "../../url";
import PdfContent from "./PDFContent";
import Page from "./NewsletterV2/Page";
import Test from "./NewsletterV2/demo";

const PDFPage = () => {
  const [data, setData] = useState([]);

  const scrollContainerStyle = { width: "800px", maxHeight: "700px" };

  const apiCall = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/newsletter/`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  const letterCard = data.map((item) => <PDFCard key={item.id} item={item} />);
  return (
    <>
     <div className="container"><Test/></div>
              

    </>
  );
};

export default PDFPage;
