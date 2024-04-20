/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdFullscreen, MdFullscreenExit, MdDownload } from "react-icons/md";
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page as ReactPdfPage } from "react-pdf";
import "./demo.css";
import samplePDF from "/src/assets/merged (1) (1).pdf";
import { forwardRef, useRef, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Page = forwardRef(({ pageNumber }, ref) => {
  return (
    <div ref={ref}>
      <ReactPdfPage pageNumber={pageNumber} width={400} />
    </div>
  );
});

function Test() {
  const book = useRef();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(600);
  const [pdfloading, setPdfloading] = useState(true);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const enterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  const handleLoadSuccess = (pdfObject) => {
    const totalPages = pdfObject.numPages;
    setTotalPage(totalPages);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  };

  const toggleFullscreen = () => {
    if (!isFullScreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const onButtonClick = () => {
    const pdfUrl = samplePDF;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const pagesMap = new Array(totalPage).fill(0);

  return (
    <>
      <Document
        file={samplePDF}
        style={{ width, height }}
        onLoadSuccess={handleLoadSuccess}
        onRender={() => {
          setPdfloading(false);
        }}

      >
        <HTMLFlipBook width={width} height={height} ref={book}>
          {window.innerWidth > 600 && <div />}
          {pagesMap.map((item, i) => (
            <Page key={i} pageNumber={i + 1} scale={2.0}></Page>
          ))}
        </HTMLFlipBook>
      </Document>

      <div className="mt-3">
        <div className="d-flex justify-content-center">
          <GrFormPrevious
            onClick={() => {
              book.current.pageFlip().flipPrev();

              if (currentPage !== 1) {
                setCurrentPage((pre) => pre - 1);
              }
            }}
            style={{ cursor: currentPage <2 ? "not-allowed" : "pointer" }}
            className="mx-2"
            size={25}
          />

          {isFullScreen ? (
            <MdFullscreenExit
              onClick={toggleFullscreen}
              style={{ cursor: "pointer" }}
              className="mx-2"
              size={25}
            />
          ) : (
            <MdFullscreen
              onClick={toggleFullscreen}
              style={{ cursor: "pointer" }}
              className="mx-2"
              size={25}
            />
          )}

          <MdDownload
            onClick={onButtonClick}
            style={{ cursor: "pointer" }}
            className="mx-2"
            size={25}
          />
          <GrFormNext
            onClick={() => {
              book.current.pageFlip().flipNext();
              if (currentPage !== totalPage / 2) {
                setCurrentPage((pre) => pre + 1);
              }
            }}
            style={{
              cursor: currentPage == (totalPage / 2) ? "not-allowed" : "pointer",
            }}
            className="mx-2"
            size={25}
          />
        </div>
      </div>
    </>
  );
}

const PDFFinal = () => {
  return (
    <>
      <Test />
    </>
  );
};

export default PDFFinal;
