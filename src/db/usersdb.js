 const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 16);
}

export const users = [
    {
        username: 'ayushraj123',
        email: '123@gmail.com',
        password: '12345678',
        fullName: 'Ayush Raj',
        role: 'user',
        id: generateRandomId(),
        accounts: [
            {
                platform: 'google',
                password: '1234',
                username: 'alibaba',
                lastAccessed: Date.now(),
                remindAfterDays: 15,
                id: generateRandomId()
            },
            {
                platform: 'facebook',
                password: '5678',
                username: 'ayushraj123',
                lastAccessed: Date.now(),
                remindAfterDays: 20,
                id: generateRandomId()
            },
            {
                platform: 'twitter',
                password: 'abcd',
                username: 'ayushraj123',
                lastAccessed: Date.now(),
                remindAfterDays: 30,
                id: generateRandomId()
            }
        ]
    },
    {
        username: 'janesmith',
        email: 'jane@example.com',
        password: 'password123',
        fullName: 'Jane Smith',
        role: 'user',
        id: generateRandomId(),
        accounts: [
            {
                platform: 'linkedin',
                password: 'efgh',
                username: 'janesmith',
                lastAccessed: Date.now(),
                remindAfterDays: 14,
                id: generateRandomId()
            },
            {
                platform: 'github',
                password: 'ijkl',
                username: 'janesmith',
                lastAccessed: Date.now(),
                remindAfterDays: 20,
                id: generateRandomId()
            },
            {
                platform: 'instagram',
                password: 'mnop',
                username: 'janesmith',
                lastAccessed: Date.now(),
                remindAfterDays: 10,
                id: generateRandomId()
            },
            {
                platform: 'reddit',
                password: 'qrst',
                username: 'janesmith',
                lastAccessed: Date.now(),
                remindAfterDays: 25,
                id: generateRandomId()
            }
        ]
    },
    {
        username: 'johnDoe',
        email: 'john@example.com',
        password: 'johnpassword',
        fullName: 'John Doe',
        role: 'user',
        id: generateRandomId(),
        accounts: [
            {
                platform: 'dropbox',
                password: 'uvwx',
                username: 'johnDoe',
                lastAccessed: Date.now(),
                remindAfterDays: 5,
                id: generateRandomId()
            },
            {
                platform: 'slack',
                password: 'yzab',
                username: 'johnDoe',
                lastAccessed: Date.now(),
                remindAfterDays: 21,
                id: generateRandomId()
            },
            {
                platform: 'pinterest',
                password: 'cdef',
                username: 'johnDoe',
                lastAccessed: Date.now(),
                remindAfterDays: 18,
                id: generateRandomId()
            },
            {
                platform: 'amazon',
                password: 'ghij',
                username: 'johnDoe',
                lastAccessed: Date.now(),
                remindAfterDays: 15,
                id: generateRandomId()
            }
        ]
    }
];

console.log(users);
