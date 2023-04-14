class BlogDTO {
    constructor(blog) {
             
        var obj = {
          id: blog["blogId"],
          blogTitle: blog["blogTitle"],
          blogBody: blog["blogBody"],
          author: blog["username"],
          createdAt: blog["createdAt"],
          updatedAt: blog["updatedAt"]
        };

        return obj;
        

    }
}

module.exports = BlogDTO;