document.addEventListener("DOMContentLoaded", () => {
  function loadArticle(src) {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const articleWrapper = document.querySelector("article"),
          moreArticleWrapper = document.querySelector(
            ".more-articles .container"
          );
        data.map((articleData, index) => {
          if (index === 0) {
            const article = `
                <div class="containerr">
                  <div class="article-container">
                    <header>
                      <div class="category">
                        <span>${articleData.category}</span>
                        <span>${articleData.country}</span>
                      </div>
                      <h1>${articleData.title}</h1>
                      <time>${articleData.added_time}</time>
                      <p>For those looking for the most important hotels in Bosnia.</p>
                    </header>
                    <section>
                      <div class="icons">
                        <ul class="font-share-icons">
                          <li>
                            <a href="" target="_blank"
                              ><i class="fa-brands fa-whatsapp whatsapp"></i
                            ></a>
                          </li>
                          <li>
                            <a href="" target="_blank"
                              ><i class="fa-brands fa-x-twitter twitter"></i
                            ></a>
                          </li>
                          <li>
                            <a href="" target="_blank"
                              ><i class="fa-brands fa-telegram telegram"></i
                            ></a>
                          </li>
                          <li>
                            <a href="" target="_blank"
                              ><i class="fa-brands fa-facebook-f facebook"></i
                            ></a>
                          </li>
                          <li>
                            <a href="" target="_blank"
                              ><i class="fa-brands fa-instagram instagram"></i
                            ></a>
                          </li>
                        </ul>
                      </div>
                    </section>
                    <figure>
                      <picture>
                        <img src="${articleData.img_src}" />
                      </picture>
                      <figcaption>${articleData.img_desc}</figcaption>
                    </figure>
                    ${articleData.content
                      .replace(/{{{{{([^}]+)}}}}}/g, "<h4>$1</h4>")
                      .replace(/{{{{([^}]+)}}}}/g, "<h3>$1</h3>")
                      .replace(/{{{([^}]+)}}}/g, "<h2>$1</h2>")
                      .replace(/\(\(\(([^)]+)\)\)\)/g, "<p>$1</p>")}
                  </div>
                </div>
              `;

            articleWrapper.innerHTML = article;
          } else {
            const moreArticle = `            
                <div class="col">
                  <h2>${articleData.country}</h2>
                  <div class="image">
                    <img src="${articleData.img_src}" alt="article image" />
                    <div class="text">
                      <h3><a href="">${articleData.title}</a></h3>
                    </div>
                  </div>
                  <div class="footer">
                    <div class="category">
                      <span>${articleData.category}</span>
                      <span>${articleData.date}</span>
                    </div>
                  </div>
                </div>
              `;

            moreArticleWrapper.innerHTML += moreArticle;
          }
        });
      });
  }

  loadArticle("../assets/json/article.json");
});

// const modifiedText = text
// .replace(/\{([^}]+)\}/g, "<h2>$1</h2>")
// .replace(/\(([^)]+)\)/g, "<p>$1</p>");
