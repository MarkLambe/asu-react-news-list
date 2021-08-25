import "./styles.scss";

const formatAsCard = (item, cardsButtonsColor) => {
  return (
    <div
      className="col col-12 col-md-6 col-lg-4 cards-items-container"
      key={item.nid}
    >
      <a href={item.path}>
        <div className="card card card-hover h-100">
          <img
            className="card-img-top"
            src={item.image_url}
            alt={item.image_alt}
            style={{ padding: 0 }}
          />
          <div className="card-header">
            <h4 className="card-title">{item.title}</h4>
          </div>
          <div className="card-body">
            <p className="card-text text-dark">{item.teaser}</p>
          </div>
          <div class="card-tags">
            {item.interests.split("|").map((tagItem, index) => {
              return (
                <span class="btn btn-tag btn-tag-alt-white" href="#">
                  {tagItem}{" "}
                </span>
              );
            })}
          </div>
          <div className="button-container">
            <a
              className={`btn btn-${
                cardsButtonsColor || "maroon"
              } text-white read-more-btn`}
              href={item.path}
            >
              Read at ASU News
            </a>
          </div>
        </div>
      </a>
    </div>
  );
};

const formatAsCardRow = (item, cardsButtonsColor) => {
  return (
    <div className="card card-hover cards-items-container" key={item.nid}>
      <a href={item.path}>
        <div className="row no-gutters">
          <div className="col-lg-4">
            <img
              className="card-img h-100"
              src={item.image_url}
              alt={item.image_alt}
            />
          </div>
          <div className="col-lg-8">
            <div className="list-view card-body row-cards-body-container">
              <h3 className="list-view card-title">
                {item.title}
                <p className="card-text text-muted m-0">
                  {item.interests.split("|").join(", ")}
                </p>
              </h3>
              <div className="button-container">
                <a
                  className={`btn btn-${
                    cardsButtonsColor || "maroon"
                  } text-white read-more-btn`}
                  href={item.path}
                >
                  Read at ASU News
                </a>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const formatAsCarouselCard = (item, index, cardsButtonsColor) => {
  return {
    id: index,
    item: (
      <div className="card card-story carousel-card h-100">
        <div className="card-img-top" style={{ padding: 0 }}>
          <span>
            <img src={item.image_url} alt={item.image_alt} />
          </span>
        </div>
        <div className="card-header">
          <h3 className="card-title card-pad-header">{item.title}</h3>
        </div>
        <div className="card-body">
          <p className="card-text text-dark card-pad-text">{item.teaser}</p>
          <a
            className={`btn btn-${cardsButtonsColor || "maroon"} text-white`}
            href={item.path}
          >
            Read more
          </a>
        </div>
      </div>
    ),
  };
};

export { formatAsCard, formatAsCardRow, formatAsCarouselCard };
