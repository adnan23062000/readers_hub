class BlogDTO {
    constructor(blog) {
             
        var obj = {
          id: blog["blogId"],
          blogTitle: blog["blogTitle"],
          blogBody: blog["blogBody"]
        };

        return obj;
        

    }
}

module.exports = BlogDTO;