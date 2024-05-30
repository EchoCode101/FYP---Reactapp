import { useEffect, useState } from "react";
import Listitems from "./Listitems";
import Spinner from "../Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import SmoothScroll from "smooth-scroll";

const List = ({ pageSize = 8, setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    // Initialize SmoothScroll
    // eslint-disable-next-line no-unused-vars
    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 800,
      easing: "easeInOutCubic",
    });

    // Show/Hide Scroll to Top button based on scroll position
    const scrollFunction = () => {
      const btn = document.getElementById("myBtn");
      if (btn) {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          btn.style.display = "block";
        } else {
          btn.style.display = "none";
        }
      }
    };

    window.addEventListener("scroll", scrollFunction);

    return () => {
      // Cleanup event listener
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  // Scroll to Top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchData = async () => {
    setProgress(10);
    const url = `http://localhost:8080/api/uni/AllUniversities/simpleData?page=${page}&limit=${pageSize}`;
    setLoading(true);
    setProgress(30);
    try {
      let data = await fetch(url, {
        method: "GET",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          Pragma: "no-cache",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
      });
      let parsedData = await data.json();
      setProgress(60);

      setArticles(parsedData.data);

      setLoading(false);
      setTotalResults(parsedData.totalResults);

      setProgress(100);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if (document.title === "UniPursuit") {
      document.title = "UniPursuit - All Universities List";
    }
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = () => {
    const url = `http://localhost:8080/api/uni/AllUniversities/simpleData?page=${
      page + 1
    }&limit=${pageSize}`;
    setPage(page + 1);

    setTimeout(async () => {
      try {
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.data));
        setTotalResults(parsedData.totalResults);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }, 700);
  };

  return (
    <>
      <div className="mt-5">
        <h1 className="text-center mt-5">International Universities Ranking</h1>

        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles && articles.length}
          next={fetchMoreData}
          hasMore={articles && articles.length !== totalResults}
          loader={<Spinner />}
        >
          {articles?.length > 0 ? (
            <>
              <div className="container my-4">
                <small>
                  <b>Total Results: 1495+</b>
                </small>
                <div className="row">
                  {articles.map((element) => {
                    return (
                      <div className="col-lg-6" key={element._id}>
                        <Listitems
                          key={element._id}
                          name={element.name ? element.name : ""}
                          urlToDetails={`/${element._id}`}
                          location={element.location}
                          region={element.region}
                          rank={element.rank}
                          image_name={element.image_name}
                        />
                      </div>
                    );
                  })}
                </div>
                <br />
                <br />
              </div>
              <button
                onClick={scrollToTop}
                id="myBtn"
                title="Go to top"
                style={{ display: "none" }}
              >
                <i className="fa-solid fa-arrow-up"></i>
              </button>
            </>
          ) : (
            <p>No articles to display</p>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};

List.propTypes = {
  pageSize: PropTypes.number,
  setProgress: PropTypes.func,
};
export default List;
