const userService = require('./userService');
// calls the service 
const userController = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message }); // internal server error 
        }
    },

    // Get a user by ID
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    // Register a new user
    async registerUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await userService.registerUser(userData);
            res.status(201).json(newUser); // success creation 
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedUser = await userService.updateUser(id, updateData);
            res.status(200).json(updatedUser); // 200 is success
        } catch (error) {
            res.status(404).json({ error: error.message }); //404 is not found error 
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deletedUser = await userService.deleteUser(id);
            res.status(200).json({ message: 'User deleted successfully', deletedUser });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = userController;
//error 401 is unautherized 
