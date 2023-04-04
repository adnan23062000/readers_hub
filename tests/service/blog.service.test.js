const blogService = require('../../service/blog.service');
const blogRepository = require('../../repository/blog.repository');
const { calculateOffset } = require('../../utils/pagination.utils');
const { getBlogsList } = require('../../utils/dtoDataList.utils');
const blogDTO = require('../../DTO/blog.dto');
const { mockBlog } = require('../mockData');

jest.mock('../../utils/pagination.utils.js');
jest.mock('../../utils/dtoDataList.utils.js');
jest.mock('../../DTO/blog.dto.js');

describe('testing blog service', () => {
    
    describe('testing create blog', () => {
        it('should call blogRepository.createBlog() method and return an object of a blog', async() => {

            const spyOnMethod = jest
                .spyOn(blogRepository, 'createBlog')
                .mockReturnValue(mockBlog[0]);

            const result = await blogService.createBlog({ blogTitle: 'blog title 3', blogBody: 'this is blog body' }, 'adnan11');


            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith('blog title 3', 'this is blog body', 'adnan11');
            expect(result).toEqual(mockBlog[0]);

        })
    }),


    describe('testing update blog', () => {
        it('should call blogRepository.updateUser() method and return true if blog is updated', async() => {
            
            const spyOnMethod = jest
                .spyOn(blogRepository, 'updateBlog')
                .mockReturnValue([1]);

            const result = await blogService.updateBlog(14, 'adnan12345');

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith(mockBlog[0].id, mockBlog[0].blogBody);
            expect(result).toEqual([1]);
        })
    }),


    describe('testing delete blog', () => {
        it('should call blogRepository.deleteBlog() method and return true if blog is deleted', async() => {
            
            const spyOnMethod = jest
                .spyOn(blogRepository, 'deleteBlog')
                .mockReturnValue(1);


            const result = await blogService.deleteBlog(14);

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith(mockBlog[0].id);
            expect(result).toEqual(1);
        })
    }),


    describe('testing get blog by blogId', () => {
        it('should call blogRepository.getBlogById() method and return a blog object of that id', async() => {
            
            const spyOnMethod = jest
                .spyOn(blogRepository, 'getBlogById')
                .mockReturnValue(mockBlog[0]);

            
            const { id, blogTitle, blogBody, author } = mockBlog[0];
            const dtoReturnData = { id, blogTitle, blogBody, author };

            blogDTO.mockImplementation((blog) => {
                return dtoReturnData;         
            });


            const result = await blogService.getBlogById(14);

            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(spyOnMethod).toHaveBeenCalledWith(mockBlog[0].id);
            expect(result).toEqual({
                id: 14,
                blogTitle: "blog title 3",
                blogBody: "adnan12345",
                author: "adnan11"
            });
        })
    }),


    describe('testing get all blogs', () => {
        it('should call the blogRepository.getAllUsers() method and return an array of all the blogs', async() => {
            
            const offset = 0;
            const limit = 3;
            
            
            calculateOffset.mockImplementation((page, limit) => {
                return offset;
            });
            
            const spyOnMethod = jest
                .spyOn(blogRepository, 'getAllBlogs')
                .mockReturnValue(mockBlog);
            
            getBlogsList.mockImplementation((blogs) => {
                return mockBlog.slice(offset, limit);
            })


            const result = await blogService.getAllBlogs(offset, limit);

            
            expect(spyOnMethod).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockBlog.slice(offset, limit));

        })
    })
    
});
