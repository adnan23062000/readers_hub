const { createBlog, getBlogById, getAllBlogs, updateBlog, deleteBlog } = require('../../service/blog.service');
const blogController = require('../../controller/blog.controller');
const { isParamValid, checkPasswordLength, convertToLowerCase } = require('../../utils/userValidation.utils');
const { contentNegotiate } = require('../../utils/contentNegotiation.utils');
const { pagination } = require('../../utils/pagination.utils');
const { isRequestBodyEmpty } = require('../../utils/requestValidation.utils');

jest.mock('../../utils/requestValidation.utils.js');
jest.mock('../../utils/userValidation.utils.js');
jest.mock('../../service/blog.service.js');
jest.mock('../../utils/contentNegotiation.utils.js');
jest.mock('../../utils/pagination.utils.js');

const req = { body: {}, query: {} };
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

const expectedResponse = [{
    "id": 14,
    "blogTitle": "blog title 3",
    "blogBody": "this is blog body",
    "author": "adnan11"
},
{
    "id": 15,
    "blogTitle": "blog title 4",
    "blogBody": "blog body 4",
    "author": "adnan2"
}];


describe('testing blog controller', () => {
    
    describe('testing createBlog', () => {
        it('should return a empty request body error in the response', async() => {

            isRequestBodyEmpty.mockReturnValue({
                success: false,
                status: 400,
                message: 'Empty Request Body'
            });

            const result = await blogController.createBlog(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Empty Request Body'
            });
        });

        it('should return the one or more fields are empty error in the response', async() => {
            
            const req = { body: {blogTitle: 'blog title 3'} };

            isRequestBodyEmpty.mockReturnValue(false);

            await blogController.createBlog(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Invalid request body'
            });
        });

        it('should return success message along with newly created blog data', async() => {
            const req = { body: {blogTitle: 'blog title 3', blogBody: 'this is blog body'}, username: 'adnan11' };

            isRequestBodyEmpty.mockReturnValue(false);
            createBlog.mockReturnValue(expectedResponse[0]);

            await blogController.createBlog(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ 
                success: true, 
                message: "Blog created", 
                data: expectedResponse[0]
            });
        });

        it('should return an error message that blog creation has failed', async() => {
            const mockError = new Error('Blog creation failed');
            const req = { body: {blogTitle: 'blog title 3', blogBody: 'this is blog body'}, username: 'adnan11' };

            isRequestBodyEmpty.mockReturnValue(false);
            createBlog.mockRejectedValueOnce(mockError);

            await blogController.createBlog(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "Blog Creation failed"});
        });
    });

    describe('testing getBlogById', () => {
        it('should return success', async() => {
            const req = { params: { blogId: 1} };

            getBlogById.mockReturnValue(expectedResponse[0]);
            contentNegotiate.mockReturnValue(true);

            await blogController.getBlogById(req, res);

            expect(contentNegotiate).toHaveBeenCalledWith(req, res, [expectedResponse[0]]);
        });

        it('should return an error when getBlogById fails', async() => {
            const req = { params: { blogId: 1} };
            const mockError = new Error('Error occured');

            getBlogById.mockRejectedValueOnce(mockError);

            await blogController.getBlogById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: 'error occured' });
        })
    });

    describe('testing getAllBlogs', () => {
        it('should return a list of all blogs', async() => {
            const mockPagination = { page: 0, limit: 3 };
            
            pagination.mockReturnValue(mockPagination);
            getAllBlogs.mockReturnValue(expectedResponse);
            contentNegotiate.mockReturnValue(true);

            await blogController.getAllBlogs(req, res);

            expect(contentNegotiate).toHaveBeenCalledWith(req, res, expectedResponse);
            
        });

        it('should return an error message when getAllBlogs() fails', async() => {
            const mockError = new Error('Error occured');
            const mockPagination = { page: 0, limit: 3 };

            pagination.mockReturnValue(mockPagination);
            getAllBlogs.mockRejectedValueOnce(mockError);

            await blogController.getAllBlogs(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: 'error occured' });
        });
    });

    describe('testing updateBlog', () => {
        it('should return invalid request body error message', async() => {
            const req = { body: { blogTitle: 'blog title 3' } };
            
            isRequestBodyEmpty.mockReturnValue(false);

            await blogController.updateBlog(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false, message: "Invalid request (No blog body included)"
            });   
        });

        it('should return success and blog updated message', async() => {
            const req = { body: { blogBody: 'this is blog body' }, params: { blogId: 1 } };

            isRequestBodyEmpty.mockReturnValue(false);
            updateBlog.mockReturnValue(1);

            await blogController.updateBlog(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, data: "Blog updated successfully" });
        });

        it('should return blog not found error message', async() => {
            const req = { body: { blogBody: 'this is blog body' }, params: { blogId: 1 } };

            isRequestBodyEmpty.mockReturnValue(false);
            updateBlog.mockReturnValue(0);

            await blogController.updateBlog(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ success: false, data: "Blog not found" });
        });

        it('should return an error message', async() => {
            const req = { body: { blogBody: 'this is blog body' }, params: { blogId: 1 } };
            const mockError = new Error('Error occured');

            isRequestBodyEmpty.mockReturnValue(false);
            updateBlog.mockRejectedValueOnce(mockError);

            await blogController.updateBlog(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "blog update failed" });
        });
    });

    describe('testing deleteBlog', () => {
        it('should return success and blog deletion message', async() => {
            const req = { params: { blogId: 1 } };

            deleteBlog.mockReturnValue(1);

            await blogController.deleteBlog(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, data: "blog deleted successfully" });
        });

        it('should return blog not found error message', async() => {
            const req = { params: { blogId: 1 } };

            deleteBlog.mockReturnValue(0);

            await blogController.deleteBlog(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ success: false, data: "blog not found" });
        });

        it('should return an error message', async() => {
            const req = { params: { blogId: 1 } };
            const mockError = new Error('Error occured');

            deleteBlog.mockRejectedValueOnce(mockError);

            await blogController.deleteBlog(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({success: false, message: "Deletion failed"});
        });
    });
});
