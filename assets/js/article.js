document.addEventListener("DOMContentLoaded", () => {
  const article_id = new URL(window.location.href).searchParams.get(
    "article_id"
  );

  ArticleService.loadArticlePage(article_id);
  ArticleService.loadMoreArticles(article_id);
});

// const modifiedText = text
// .replace(/\{([^}]+)\}/g, "<h2>$1</h2>")
// .replace(/\(([^)]+)\)/g, "<p>$1</p>");
