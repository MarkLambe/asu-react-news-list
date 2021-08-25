import React, { Component } from "react";
import D8News from "./D8News";
import { BaseCarousel } from "./BaseCarousel/BaseCarousel";
import { newsService } from "./services";
import Loader from "react-loader-spinner";
import Fade from "react-reveal/Fade";
import {
  formatAsCarouselCard,
  formatAsCard,
  formatAsCardRow,
} from "./cardFormatters";
import PropTypes from "prop-types";
import "./NewsDisplay.scss";
class NewsDisplay extends Component {
  state = {
    ourData: [],
    pages: 0,
    currentPage: 0,
    isLoaded: false,
    callErr: true,
    errMsg: "",
  };

  componentDidMount() {
    const url = this.props.data.feed + (this.props.data.feedSection || "");
    const res = newsService(url)
      .then((feedData) => {
        this.setState({
          ourData: feedData.ourData,
          pages: feedData.pages,
          currentPage: feedData.currentPage,
          isLoaded: feedData.isLoaded,
          callErr: feedData.callErr,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: error.isLoaded,
          callErr: error.callErr,
          errMsg: error.errMsg,
        });
      });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="loader">
          <Loader type="ThreeDots" color="#5C6670" height="100" width="100" />
        </div>
      );
    } else if (this.state.callErr) {
      return (
        <Fade>
          <div className="errorContainer">
            <h3 className="errorTitle">
              Oops! Looks like the ASU Now News Feed could not be loaded.
            </h3>
            <p className="errorCode">{this.state.errMsg}</p>
          </div>
        </Fade>
      );
    } else {
      let newsItems = [...this.state.ourData];
      if (this.props.data.items) {
        newsItems = newsItems.slice(0, parseInt(this.props.data.items));
      }

      const headerTitle =
        this.props.data.headerTitle || "Knowledge and enterprise news";
      const headerColor = this.props.data.headerColor || "dark";
      const ctaLink = this.props.data.ctaLink || "https://news.asu.edu/";
      const ctaText = this.props.data.ctaText || "More stories and videos";
      const ctaColor = this.props.data.ctaColor || "gold";

      const headerSection = (
        <div className="feed-header-section">
          <span className={`feed-header-title color-${headerColor}`}>
            {headerTitle}
          </span>
          <span className="feed-header-control">
            <a className={`btn btn-${ctaColor}`} href={ctaLink}>
              {ctaText}
            </a>
          </span>
        </div>
      );
      const displayMode = ["Carousel", "Cards", "Horizontal"].includes(
        this.props.data.view
      )
        ? this.props.data.view
        : "Other";
      const newsComponent = {
        Carousel: (
          <div className="news-feed">
            <div className="carousel-wrapper">
              {headerSection}
              <BaseCarousel
                carouselItems={newsItems.map((item, index) =>
                  formatAsCarouselCard(
                    item,
                    index,
                    this.props.data.cardsButtonsColor
                  )
                )}
                perView="3"
              />
            </div>
          </div>
        ),
        Cards: (
          <div className="news-feed">
            <div className="cards-wrapper">
              {headerSection}
              <D8News
                newsItems={newsItems.map((item) =>
                  formatAsCard(item, this.props.data.cardsButtonsColor)
                )}
              />
            </div>
          </div>
        ),
        Horizontal: (
          <div className="news-feed">
            <div className="horizontal-wrapper">
              {headerSection}
              <D8News
                newsItems={newsItems.map((item) =>
                  formatAsCardRow(item, this.props.data.cardsButtonsColor)
                )}
              />
            </div>
          </div>
        ),
        Other: <div>data-view must be specified</div>,
      };

      return newsComponent[displayMode];
    }
  }
}

NewsDisplay.propTypes = {
  data: PropTypes.object.isRequired,
};

export default NewsDisplay;
