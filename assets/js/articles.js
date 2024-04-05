document.addEventListener("DOMContentLoaded", () => {
  function articles(src, redirect, sectionSelector) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const articles = document.querySelector(sectionSelector);
        data.map((articleData) => {
          const articleCon = `
            <div class="col">
              <a href="${redirect}">
                <div class="card">
                  <img
                    src="${articleData.imgSrc}"
                    class="card-img-top"
                    alt="Article Image"
                  />
                  <div class="card-body">
                    <h3 class="card-title">${articleData.title}</h3>
                    <p class="card-text">
                    ${articleData.description}
                    </p>
                  </div>
                  <div class="footer">
                    <div class="category">
                      <span>${articleData.category}</span>
                      <span>${articleData.time}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          `;
          articles.innerHTML += articleCon;
        });
      });
  }

  articles(
    "../json/articlesCities.json",
    "../html/article.html",
    ".articles.first .container .row"
  );
  articles(
    "../json/articlesHotels.json",
    "../html/article.html",
    ".articles.second .container .row"
  );
  articles(
    "../json/articlesTourism.json",
    "../html/article.html",
    ".articles.third .container .row"
  );
});
