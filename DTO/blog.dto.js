class BlogDTO {
  constructor(blog) {
           
      var obj = {
        id: blog["blogId"],
        blogTitle: blog["blogTitle"],
        blogBody: blog["blogBody"],
        author: blog["username"],
        createdAt: new Date(blog["createdAt"]).toLocaleString().replace(',', ''),
        updatedAt: new Date(blog["updatedAt"]).toLocaleString().replace(',', '')
      };

      return obj;
  }
}

module.exports = BlogDTO;
