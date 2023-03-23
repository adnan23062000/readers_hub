class BlogDTO {
  constructor(blog) {
    const obj = {
      id: blog.blogId,
      blogTitle: blog.blogTitle,
      blogBody: blog.blogBody,
      author: blog.username,
    };

    return obj;
  }
}

module.exports = BlogDTO;
