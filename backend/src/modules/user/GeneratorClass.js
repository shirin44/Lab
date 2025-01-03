const userRepository = require('./userRepository');

class UserGenerator {
    constructor() {
        this.idCounter = 1; // Counter to generate unique IDs
        this.repo = userRepository; // Set as a class property for accessibility
    }

    // Generator function to create users
    *generateUser() {
        while (true) {
            yield {
                id: this.idCounter++,
                name: `User${this.idCounter}`,
                email: `user${this.idCounter}@example.com`,
                password: `password${this.idCounter}`,
                role: 'user', // Default role
                isActive: true,
                createdAt: new Date(),
            };
        }
    }

    // Generate and save a specific number of users
    async generateUsers(count) {
        const users = [];
        const userIterator = this.generateUser();

        for (let i = 0; i < count; i++) {
            const user = userIterator.next().value;

            try {
                const savedUser = await this.repo.createUser(user); // Save user to the database
                users.push(savedUser); // Add the saved user to the list
            } catch (error) {
                console.error('Error saving user:', error.message);
            }
        }

       // return users; // Return the list of generated users return is just for verification 
    }
}

module.exports = UserGenerator;
