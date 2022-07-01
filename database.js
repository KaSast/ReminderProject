const database = {
    cindy: {
        id: 1,
        email: "cindy@gmail.com",
        password: "cindy1",
        reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}, 
        {id:2, title: "test1", description: "test1", completed: false},
        {id:3, title: "test2", description: "test2", completed: false},
        {id:4, title: "test3", description: "test3", completed: false}]
    },
    alex: {
        id: 2,
        email: "alex@gmail.com",
        password: "alex1",
        reminders: []
    }, 
    kashton: {
        id: 3,
        email: "kashton@gmail.com",
        password: "kashton1",
        reminders: [{id: 1, title: "Add Login", description: "add login functionality to app"}]
    }
}

const userModel = {
    findByEmail: (email) => {
        console.log("userModel findByEmail called");
        const user = database.find((user) => user.email === email);
        if(user) {
            return user;
        }
        throw new Error(`Couldn't find user with email: ${email}`);
    },
    
    findById: (id) => {
        console.log("userModel findById called");
        const user = database.find((id) => user.id === id);
        if(user) {
            return user;
        }
        throw new Error(`Couldn't find user with email: ${id}`);
    },
}

module.exports = {
    database,
    userModel,
}