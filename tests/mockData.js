const mockUser = [{
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password',
    createdAt: '2023-03-22T10:30:55.000Z',
    updateAt: '2023-03-28T10:57:10.000Z'
},
{
    username: 'testuser2',
    email: 'testuser2@example.com',
    password: 'password2',
    createdAt: '2023-03-23T10:30:55.000Z',
    updateAt: '2023-03-29T10:57:10.000Z'
},
{
    username: 'testuser3',
    email: 'testuser3@example.com',
    password: 'password3',
    createdAt: '2023-03-23T10:30:55.000Z',
    updateAt: '2023-03-29T10:57:10.000Z'
},
{
    username: 'testuser4',
    email: 'testuser4@example.com',
    password: 'password4',
    createdAt: '2023-03-23T10:30:55.000Z',
    updateAt: '2023-03-29T10:57:10.000Z'
}];


const mockBlog = [
    {
        "id": 14,
        "blogTitle": "blog title 3",
        "blogBody": "adnan12345",
        "author": "adnan11"
    },
    {
        "id": 15,
        "blogTitle": "blog title 4",
        "blogBody": "blog body 4",
        "author": "adnan2"
    },
    {
        "id": 16,
        "blogTitle": "blog title 5",
        "blogBody": "blog body 5",
        "author": "adnan2"
    },
    {
        "id": 17,
        "blogTitle": "test for issue 6",
        "blogBody": "adnan12345",
        "author": "adnan11"
    },
    {
        "id": 18,
        "blogTitle": "hello",
        "blogBody": "adnan12345",
        "author": "adnan11"
    }
];

module.exports = { mockUser, mockBlog };

