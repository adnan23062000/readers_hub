class BlogDTO {
  constructor(blog) {
    Object.assign(this, {
      id: blog.blogId,
      blogTitle: blog.blogTitle,
      blogBody: blog.blogBody,
      author: blog.username,
    });
  }
}

module.exports = BlogDTO;
