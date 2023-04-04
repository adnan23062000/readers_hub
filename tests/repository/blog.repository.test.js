const blogRepository = require('../../repository/blog.repository');
const Blog = require('../../model/blog.model');
const { mockBlog } = require('../mockData');

describe('Blog Repository unit tests', () => {

    describe('testing getAllBlogs', () => {
      it('should return an array of blogs', async () => {
        const offset = 0;
        const limit = 3;
        const spyOnMethod = jest
          .spyOn(Blog, 'findAll')
          .mockImplementation(({ offset, limit }) => mockBlog.slice(offset, limit));
        
        const result = await blogRepository.getAllBlogs(offset, limit);
  
        expect(result).toEqual(mockBlog.slice(offset, limit));
        expect(result.length).toBe(3);
        expect(spyOnMethod).toHaveBeenCalledTimes(1);
        expect(spyOnMethod).toHaveBeenCalledWith({ offset, limit });
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
                author: expect.any(String),
                blogTitle: expect.any(String),
                blogBody: expect.any(String),
                id: expect.any(Number),
            }),
          ])
        );
      });
    });
  
    describe('testing getBlogById', () => {
      it('should return a blog object for a valid blog id', async () => {
        const spyOnMethod = jest
          .spyOn(Blog, 'findOne')
          .mockResolvedValueOnce(mockBlog[0]);
        
        const result = await blogRepository.getBlogById(14);
        
        expect(result).toEqual(mockBlog[0]);
        expect(spyOnMethod).toHaveBeenCalledTimes(1);
        expect(spyOnMethod).toHaveBeenCalledWith({
          where: { blogId: 14 },
        });
        expect(result).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            blogTitle: expect.any(String),
            blogBody: expect.any(String),
            author: expect.any(String),
          })
        );
      });
    });

  
    describe('testing createBlog', () => {
      it('should create a new blog', async () => {
        const spyOnMethod = jest
          .spyOn(Blog, 'create')
          .mockResolvedValueOnce(mockBlog[0]);
        
        const result = await blogRepository.createBlog(
          'blog title 3',
          'adnan12345',
          'adnan11'
        );
  
        expect(spyOnMethod).toHaveBeenCalledTimes(1);
        expect(spyOnMethod).toHaveBeenCalledWith({
          blogBody: 'adnan12345',
          blogTitle: 'blog title 3',
          username: 'adnan11',
        });
        expect(result).toEqual(mockBlog[0]);
        expect(result).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            blogTitle: expect.any(String),
            blogBody: expect.any(String),
            author: expect.any(String),
          })
        );
      });
    });
  
    describe('testing updateBlog', () => {
      it('should update the blog body for a valid blogId', async () => {
        const spyOnUpdate = jest
          .spyOn(Blog, 'update')
          .mockResolvedValueOnce([1]);
        
        const result = await blogRepository.updateBlog(14, 'adnan12345');
        
        expect(result).toEqual([1]);
        expect(spyOnUpdate).toHaveBeenCalledTimes(1);
        expect(spyOnUpdate).toHaveBeenCalledWith(
          { blogBody: 'adnan12345' },
          { where: { blogId: 14 } }, 
        );
      });
    });
  
    describe('testing deleteBlog', () => {
      it('should delete a blog for a valid blogId', async () => {
        const spyOnDestroy = jest.spyOn(Blog, 'destroy').mockResolvedValueOnce(1);
        
        const blogId = 14;
        const result = await blogRepository.deleteBlog(blogId);
        
        expect(result).toEqual(1);
        expect(spyOnDestroy).toHaveBeenCalledTimes(1);
        expect(spyOnDestroy).toHaveBeenCalledWith({
          where: {
            blogId,
          },
        });
      });
    });
  
  });