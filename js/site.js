function getData() {
  let blogs = [];

  let article1 = {
    title: "The power of css",
    content:
      "One morning, when Gregor Samsa woke from  troubled dreams, he found himself transformed in his bed into a horrible vermin. He    lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding",
    imageData: "",
    imageType: "",
    day: 11,
    month: "Febuary",
    link: "https://google.com",
    publishedDate: "1/1/2022",
  };

  let article2 = {
    title: "The power of css",
    content:
      "One morning, when Gregor Samsa woke from  troubled dreams, he found himself transformed in his bed into a horrible vermin. He    lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding",
    imageData: "",
    imageType: "",
    day: 11,
    month: "Febuary",
    link: "https://google.com",
    publishedDate: "1/1/2022",
  };

  blogs[0] = article1;
  blogs[1] = article1;

  return blogs;
}

function fetchBlogData() {
  fetch("https://cf-blog-net6.herokuapp.com/api/BlogPosts?num=3")
    .then((response) => response.json())
    .then(function (data) {
      displayBlog(data);
    });
}

function displayBlog(data) {
  //blogs = getData();

  let template = document.getElementById("blog-template");
  let blogSection = document.getElementById("blogs");
  /* 
  "title": "string",
  "slug": "string",
  "categoryId": 0,
  "abstract": "string",
  "content": "string",
  "created": "2022-08-24",
  "updated": "2022-08-24",
  "isPublished": true,
  "isDeleted": true,
  "imageData": "string",
  "imageType": "string",
  "blogPostImage": "string", */

  data.forEach((article) => {
    const articleCard = document.importNode(template.content, true);
    //format image
    imageDiv = articleCard.querySelector('[data-blog="imageLink"]');
    imageDiv.setAttribute(
      "href",
      `http://cf-blog-net6.herokuapp.com/content/${article.slug}`
    );

    imgTag = document.createElement("img");
    imgTag.setAttribute(
      "src",
      `data:${article.imageType};base64,${article.imageData}`
    );
    imgTag.classList.add("blog-image");
    imageDiv.appendChild(imgTag);
    // <img src="data:image/gif;base64,xxxxxxxxxxxxx..." class="blog-image" alt="...">
    //add title
    cardTitleDiv = articleCard.querySelector("[data-blog='title']");
    cardTitleDiv.innerHTML = article.title;

    let blogDate = new Date(article.created); // 2009-11-10
    let month = blogDate.toLocaleString("default", { month: "long" });
    let day = blogDate.getDate();

    //add day
    blogDayDiv = articleCard.querySelector("[data-blog='day']");
    blogDayDiv.innerHTML = day;

    //add month
    blogMonthDiv = articleCard.querySelector("[data-blog='month']");

    blogMonthDiv.innerHTML = month;

    //add content
    blogContentDiv = articleCard.querySelector("[data-blog='content']");
    blogContentDiv.innerHTML = article.content;

    //readmore link
    blogLink = articleCard.querySelector("[data-blog='readMoreLink']");
    blogLink.setAttribute(
      "href",
      `http://cf-blog-net6.herokuapp.com/content/${article.slug}`
    );

    blogPubDate = articleCard.querySelector("[data-blog='publishedDate']");

    dateToday = new Date();
    createdDate = new Date(
      article.updated != null ? article.updated : article.created
    );
    diffTime = Math.abs(dateToday.getTime() - createdDate.getTime());
    lastUpdated = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (lastUpdated == 1) {
        blogPubDate.innerHTML = `Published ${lastUpdated} day ago`;
    } else {
        blogPubDate.innerHTML = `Published ${lastUpdated} days ago`;
    }

    blogSection.appendChild(articleCard);
  });
}
