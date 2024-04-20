/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import BreakingNews from "../BreakingNews/breakingNews";
import Features from "../Features/Features";
import HomeBannerV3 from "./HomeBannerv3/HomeBannerV3";
import HomeBannerV4 from "./HomeBannerv4/HomeBannerV4";
import HomeBannerV2 from "./Homebanner_v2/HomeBannerV2";
import axios from "axios";
import { Url } from "../../url";
import "./homTopContent.css";
import parse from "html-react-parser";
import Ad__90_728_1 from "../Ads/Ad_90_728_1";

const HomeContentTop = () => {
  const [displayTopAd, setDisplayTopAd] = useState(true);
  const [sliderOption, setSliderOption] = useState("");
  const [headerAd, setHeaderAd] = useState({});
  const [indexTopAd, setIndexTopAd] = useState({});

  const sliderApi = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/post/sliderView`
      );
      console.log(res);
      setSliderOption(res.data[0].slider_type);
    } catch (err) {
      console.log(err);
    }
  };

  const homeAdApi = async () => {
    try {
      const resheader = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/ad_space/single_ad/header`
      );
      const resIndexTop = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/ad_space/single_ad/index_top`
      );
      setHeaderAd({
        ...headerAd,
        ad_code_728: resheader.data[0].ad_code_728,
        ad_code_300: resheader.data[0].ad_code_300,
      });
      setIndexTopAd({
        ...indexTopAd,
        ad_code_728: resIndexTop.data[0].ad_code_728,
        ad_code_300: resIndexTop.data[0].ad_code_300,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setDisplayTopAd(false);
    }, 3000);
    homeAdApi();
  }, []);

  useEffect(() => {
    sliderApi();
  }, [sliderOption]);
  return (
    <>
      <div className={displayTopAd ? "row mt-3" : ""}>
        <div className="col-12 d-flex justify-content-center">
          <div
            className={`${displayTopAd ? "ad-top-container" : "ad-top-hidden"}`}
          >
            <Ad__90_728_1>
              {window.innerWidth < 600
                ? parse(String(headerAd.ad_code_300))
                : parse(String(headerAd.ad_code_728))}
            </Ad__90_728_1>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <BreakingNews />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          {/* <HomeBanner /> */}

          {sliderOption == "1" && <HomeBannerV2 />}
          {sliderOption == "2" && <HomeBannerV3 />}
          {sliderOption == "3" && <HomeBannerV4 />}
        </div>
      </div>

      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <Ad__90_728_1>
            {window.innerWidth < 600
              ? parse(String(indexTopAd.ad_code_300))
              : parse(String(indexTopAd.ad_code_728))}
          </Ad__90_728_1>
        </div>
      </div>
      {sliderOption == "3" && (
        <div className="row">
          <div className="col-12 mt-4">
            <Features />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeContentTop;
