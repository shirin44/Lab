const User = require('./userModel'); 
// fetches data from database then gives it to service 
const userRepository = {
    // Get all users
    async getAllUsers() {
        try {
            return await User.find();
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    },

    // Get a user by ID
    async getUserById(userId) {
        try {
            return await User.findById(userId);
        } catch (error) {
            throw new Error('Error fetching user by ID: ' + error.message);
        }
    },

    // Get a user by email
    async getUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw new Error('Error fetching user by email: ' + error.message);
        }
    },

    // Create a new user
    async createUser(userData) {
        try {
            const newUser = new User(userData);
            return await newUser.save();
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    },

    // Update a user by ID
    async updateUserById(userId, updateData) {
        try {
            return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    },

    // Delete a user by ID
    async deleteUserById(userId) {
        try {
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    },
};

module.exports = userRepository;
