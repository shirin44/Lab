const userRepository = require('./userRepository');
// fetches data and computes values 
const userService = {
    // Fetch all users
    async getAllUsers() {
        try {
            const users = await userRepository.getAllUsers();
            return users;
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    },

    // Fetch a user by ID
    async getUserById(userId) {
        try {
            const user = await userRepository.getUserById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user by ID: ' + error.message);
        }
    },

    // Register a new user
    async registerUser(userData) {
        try {
            const existingUser = await userRepository.getUserByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email already in use');
            }
            const newUser = await userRepository.createUser(userData);
            return newUser;
        } catch (error) {
            throw new Error('Error registering user: ' + error.message);
        }
    },

    // Update user details
    async updateUser(userId, updateData) {
        try {
            const updatedUser = await userRepository.updateUserById(userId, updateData);
            if (!updatedUser) {
                throw new Error('User not found or update failed');
            }
            return updatedUser;
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    },

    // Delete a user
    async deleteUser(userId) {
        try {
            const deletedUser = await userRepository.deleteUserById(userId);
            if (!deletedUser) {
                throw new Error('User not found or delete failed');
            }
            return deletedUser;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    },
};

module.exports = userService;
