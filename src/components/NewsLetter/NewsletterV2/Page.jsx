import "./letter.css"

const Page = () => {
  return (
    <>
    
            <input type="checkbox" id="checkbox-cover" />
            <input type="checkbox" id="checkbox-page1" />
            <input type="checkbox" id="checkbox-page2" />
            <input type="checkbox" id="checkbox-page3" />
            <div className="book">
            <div className="cover">
                <label htmlFor="checkbox-cover"></label>
            </div>

            <div className="page" id="page1">
                <div className="front-page">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil magni laudantium beatae quia. Recusandae, fuga quas consectetur perferendis aperiam esse velit veniam ducimus? Quisquam consequatur perferendis quidem quia, recusandae ab!</p>
                    <label className="next" htmlFor="checkbox-page1"><i className="fas fa-chevron-right"></i></label>
                </div>
                <div className="back-page">
                    <img src="1.jpg" alt="Page 1" />
                    <label className="prev" htmlFor="checkbox-page1"><i className="fas fa-chevron-left"></i></label>
                </div>
            </div>

            <div className="page" id="page2">
                <div className="front-page">
                    <h2>Page 2</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil magni laudantium beatae quia. Recusandae, fuga quas consectetur perferendis aperiam esse velit veniam ducimus? Quisquam consequatur perferendis quidem quia, recusandae ab!</p>
                    <label className="next" htmlFor="checkbox-page2"><i className="fas fa-chevron-right"></i></label>
                </div>
                <div className="back-page">
                    <img src="2.jpg" alt="Page 2" />
                    <label className="prev" htmlFor="checkbox-page2"><i className="fas fa-chevron-left"></i></label>
                </div>
            </div>

            <div className="page" id="page3">
                <div className="front-page">
                    <h2>Page 3</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil magni laudantium beatae quia. Recusandae, fuga quas consectetur perferendis aperiam esse velit veniam ducimus? Quisquam consequatur perferendis quidem quia, recusandae ab!</p>
                </div>
            </div>

            <div className="back-cover"></div>
        </div>
    </>
  )
}

export default Page