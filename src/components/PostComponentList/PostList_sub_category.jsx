/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Url } from "../../url";
import SideContent from "../SideContent/SideContent";
import PaginatedItems from "./PaginationList";
import parse from "html-react-parser";
import MyNavbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import Ad__90_728_1 from "../Ads/Ad_90_728_1";

const PostList_Sub = () => {
  const { main_category, sub_category } = useParams();

  const [data, setData] = useState([]);

  const [postTopad, setPostTopAd] = useState({});
  const [postBottomad, setPostBottomAd] = useState({});

  const postAdApi = async () => {
    try {
      const resheader = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/ad_space/single_ad/category_top`
      );
      const resfooter = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }api/ad_space/single_ad/category_bottom`
      );
      setPostTopAd({
        ...postTopad,
        ad_code_728: resheader.data[0].ad_code_728,
        ad_code_300: resheader.data[0].ad_code_300,
      });
      setPostBottomAd({
        ...postBottomad,
        ad_code_728: resfooter.data[0].ad_code_728,
        ad_code_300: resfooter.data[0].ad_code_300,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const postListApi = async () => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }api/post/main/${main_category}/${sub_category}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    postListApi();
    postAdApi();
  }, [sub_category]);

  return (
    <>
      <MyNavbar />
      <div className="main-content__position">
        <div className="container mt-3">
          <div className="row my-3">
            <div className="col-12 d-flex justify-content-center">
              <Ad__90_728_1>
                {window.innerWidth < 600
                  ? parse(String(postTopad.ad_code_300))
                  : parse(String(postTopad.ad_code_728))}
              </Ad__90_728_1>
            </div>
          </div>
          <div className="row  gx-5 justify-content-center">
            <div className="col-lg-7 mt-4">
              <div className="row ">
                <PaginatedItems data={data} />
              </div>
            </div>
            <SideContent />
          </div>
          <div className="row my-3">
            <div className="col-12 d-flex justify-content-center">
              <Ad__90_728_1>
                {window.innerWidth < 600
                  ? parse(String(postBottomad.ad_code_300))
                  : parse(String(postBottomad.ad_code_728))}
              </Ad__90_728_1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostList_Sub;
