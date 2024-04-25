var ArticleService = {
  loadTable: () => {
    RestClient.get("articles/get_articles.php", (data) => {
      const tableBody = document.querySelector("#tbl_articles tbody");
      tableBody.innerHTML = "";
      data.forEach((articleData) => {
        ArticleService.loadTableRow(tableBody, articleData);
      });
    });
  },
  loadTableRow: (tableBody, articleData) => {
    tableBody.innerHTML += `
    <tr>
    <td class="table-image">
      <img
        src="${articleData.img_src}"
        alt="Article Image"
      />
    </td>
    <td>${articleData.title}</td>
    <td>${articleData.description}</td>
    <td class="content">${articleData.content}</td>
    <td>${articleData.img_desc}</td>
    <td>${articleData.category}</td>
    <td>${articleData.added_time}</td>
    <td>${articleData.status}</td>
    <td>
      <button
        class="txt-c d-block fs-15 rad-6 bg-blue c-white w-81 btn-shape"
        onClick="ArticleService.openEditArticleModal(${articleData.article_id})"
      >
        Edit
      </button>
      <button
        class="txt-c mt-10 d-block fs-15 rad-6 bg-red c-white w-81 btn-shape"
        onClick="ArticleService.removeArticle(${articleData.article_id})"
      >
        Remove
      </button>
    </td>
  </tr>
    `;
  },
  addArticleModal: (message) => {
    const modal = document.getElementById("myModal");
    modal.innerHTML = `
    <div class="master-container">
      <div class="card cart">
        <div class="top-title">
          <span class="title">Add Article</span>
          <i class="fa-solid fa-xmark x"></i>
        </div>
        <div class="form">
          <form id="article-form">
            <div class="inputs">
              <div class="form-control">
              <input
                  type="hidden"
                  id="article_id"
                  name="article_id"
                />
                <input
                  type="text"
                  class="field"
                  required
                  id="title"
                  name="title"
                />
                <label for="title">
                  Title
                </label>
              </div>
              <div class="form-control">
                <input
                  type="text"
                  id="img_src"
                  name="img_src"
                  class="field"
                  required
                />
                <label for="img_src">
                  Image Source
                </label>
              </div>
            <div class="form-control">
              <input
                type="text"
                id="country"
                name="country"
                class="field"
                required
              />
              <label for="country">
                Country
              </label>
            </div>
              <div class="form-control">
                <input
                  type="text"
                  class="field"
                  required
                  id="category"
                  name="category"
                />
                <label for="category">
                  Category
                </label>
              </div>
              <div class="form-control">
                <input
                  type="text"
                  class="field"
                  required
                  id="status"
                  name="status"
                />
                <label for="status">
                  Status
                </label>
              </div>
              <div class="form-control full">
                <input type="datetime-local" id="added_time" name="added_time" />
              </div>
            </div>
            <div class="textareas">
              <div class="form-control">
                <div class="textarea">
                  <textarea
                    id="content"
                    name="content"
                    required
                    class="field"
                  ></textarea>
                </div>
                <label for="content" class="txtar-la">
                  Content
                </label>
              </div>
              <div class="form-control">
                <div class="textarea">
                  <textarea
                    id="description"
                    name="description"
                    required
                    class="field"
                  ></textarea>
                </div>
                <label for="description" class="txtar-la">
                  Description
                </label>
              </div>
              <div class="form-control">
                <div class="textarea">
                  <textarea
                    id="img_desc"
                    name="img_desc"
                    required
                    class="field"
                  ></textarea>
                </div>
                <label for="img_desc" class="txtar-la">
                  Img Descr
                </label>
              </div>
            </div>
            <input type="submit" class="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
    `;
    Utils.formSetup(modal, () => {
      Utils.submit(
        "article-form",
        "articles/add_article.php",
        message,
        () => {
          ArticleService.loadTable("tbl_articles");
        },
        modal
      );
    });
  },
  openEditArticleModal: (id) => {
    RestClient.get("articles/get_article.php?article_id=" + id, (data) => {
      ArticleService.addArticleModal("Article edit successfully");

      $("#myModal input[name='article_id']").val(data.article_id);
      $("#myModal input[name='img_src']").val(data.img_src);
      $("#myModal input[name='title']").val(data.title);
      $("#myModal input[name='status']").val(data.status);
      $("#myModal input[name='category']").val(data.category);
      $("#myModal input[name='country']").val(data.country);
      $("#myModal input[name='added_time']").val(data.added_time);
      $("#myModal textarea[name='img_desc']").val(data.img_desc);
      $("#myModal textarea[name='description']").val(data.description);
      $("#myModal textarea[name='content']").val(data.content);
      Utils.formAnimation();
    });
  },
  removeArticle: (id) => {
    if (
      confirm("Do you want to delete article with the id " + id + "?") == true
    ) {
      RestClient.delete(
        "articles/delete_article.php?article_id=" + id,
        {},
        () => {
          ArticleService.loadTable("tbl_articles");
        }
      );
    }
  },
  loadArticleCrousel: () => {
    RestClient.get("articles/get_articles.php", (data) => {
      const articles = document.querySelector(
        ".articles .splide__track .container.splide__list"
      );
      data.forEach((articleData) => {
        const articleCon = `
        <div class="article splide__slide">
          <!-- <a href="pages/article.html?article_id=${articleData.article_id}"> -->
            <div class="image">
              <img src="${articleData.img_src}" alt="" />
            </div>
          <!-- </a> -->
          <div class="card">
            <div class="content">
              <h3>${articleData.title}</h3>
              <div class="icons">
                <ul class="font-share-icons">
                  <li>
                    <a href="" target="_blank"
                      ><i class="fa-brands fa-whatsapp whatsapp"></i
                    ></a>
                  </li>
                  <li>
                    <a href="" target="_blank"
                      ><i class="fa-brands fa-facebook-messenger"></i
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
                <button class="share-btn">
                  <i class="fa-solid fa-share share"></i>
                </button>
              </div>
              <p>${articleData.description}</p>
              <a
                href="pages/article.html?article_id=${articleData.article_id}"
                class="read"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
        `;
        articles.innerHTML += articleCon;
      });
      Utils.carouselSplide(".articles .splide");
      //share icon in article
      const shareIcons = document.querySelectorAll(".share-btn"),
        shareLists = document.querySelectorAll(".icons .font-share-icons");

      shareIcons.forEach((shareIcon, index) => {
        shareIcon.addEventListener("click", () => {
          if (shareLists[index].style.display != "grid") {
            shareLists[index].style.display = "grid";
            shareLists[index].style.animation = "appear 0.2s linear forwards";
          } else {
            shareLists[index].style.animation =
              "hidden var(--main-transition) linear forwards";
            setTimeout(() => {
              shareLists[index].style.display = "none";
            }, 300);
          }
        });
        shareIcon.addEventListener("blur", () => {
          shareLists[index].style.animation =
            "hidden var(--main-transition) linear forwards";
          setTimeout(() => {
            shareLists[index].style.display = "none";
          }, 300);
        });
      });
    });
  },
  loadArticlePage: (id) => {
    RestClient.get(
      "articles/get_article.php?article_id=" + id,
      (articleData) => {
        const articleWrapper = document.querySelector("article"),
          moreArticleWrapper = document.querySelector(
            ".more-articles .container"
          );
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
      },
      (error) => {
        console.error(error);
      }
    );
  },
  loadMoreArticles: (id) => {
    RestClient.get("articles/get_articles.php", (data) => {
      const moreArticleWrapper = document.querySelector(
        ".more-articles .container"
      );
      data.map((articleData) => {
        if (articleData.article_id == id) {
          return;
        }
        const moreArticle = `
          <div class="col">
            <h2>${articleData.country}</h2>
            <a href="./article.html?article_id=${articleData.article_id}">
              <div class="image">
                <img src="${articleData.img_src}" alt="article image" />
                <div class="text">
                  <h3>${articleData.title}</h3>
                </div>
              </div>
            </a>
            <div class="footer">
              <div class="category">
                <span>${articleData.category}</span>
                <span>${articleData.added_time}</span>
              </div>
            </div>
          </div>
        `;
        moreArticleWrapper.innerHTML += moreArticle;
      });
    });
  },
  loadArticlesPage: (category) => {
    RestClient.get("articles/get_articles.php?category=" + category, (data) => {
      const articles = document.querySelector(
        `.articles.${category.toLowerCase()} .container .row`
      );
      data.map((articleData) => {
        const articleCon = `
            <div class="col">
              <a href="pages/article.html?article_id=${articleData.article_id}">
                <div class="card">
                  <img
                    src="${articleData.img_src}"
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
                      <span>${articleData.added_time}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          `;
        articles.innerHTML += articleCon;
      });
    });
  },
};
