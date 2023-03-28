class BlogDTO {
    constructor(blog) {
             
        var obj = {
          id: blog["blogId"],
          blogTitle: blog["blogTitle"],
          blogBody: blog["blogBody"],
          author: blog["username"]
        };

        return obj;
        

    }
}

module.exports = BlogDTO;