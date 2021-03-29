const { hashPassword, checkPassword } = require('../helpers/hashPassword');
var User = require('../models/User.Model');
class UserService {
    signUp(email, username, password) {
        password = hashPassword(password);
        var user = new User({ email, username, password });
        user.save();
        return user;
    }
    async login(email, password) {
        var user = await User.findOne({ email }).populate('friends', ['username', 'avatar', '_id']).populate('reqFriends', ['username', 'avatar', '_id']).exec();
        if (user && checkPassword(password, user.password)) return user;
        else return null;
    }
    async fetchInfor(userData) {
        var user = await User.findOne({ _id: userData._id })
            .populate('friends', ['username', 'avatar', '_id'])
            .populate('reqFriends', ['username', 'avatar', '_id'])
            .populate({
                path: 'conversations',
                populate: [
                    { path: 'users', select: ['username', 'avatar', '_id'] },
                    { path: 'messages.user', select: ['username', 'avatar', '_id'] }
                ]
            })
            // .populate('conversations.users', ['username', 'avatar', '_id'])
            // .populate('conversations.messages.user', ['username', 'avatar', '_id'])
            .exec();
        if (user) return user;
        else return null;
    }
    async updateProfile(userID, userData) {
        var respone = await User.updateOne({ _id: userID }, { usename: userData.username, avatar: userData.avatar });
        return respone;
    }
    async searchFriends(id, keyword) {
        var regex = new RegExp(keyword, 'i');
        var listUser = await User.find({
            $and: [
                { _id: { $ne: id } },
                {
                    $or: [
                        { username: regex },
                        { email: regex }
                    ]
                }
            ]
        }, {
            username: 1,
            avatar: true
        });
        return listUser;
    }
    async reqFriend(from, to) {
        var respone = await User.updateOne({ _id: to }, { $push: { reqFriends: from._id } });
        if (respone.nModified) {
            return true;
        }
        return false
    }
    async addFriend(from, to) {
        var respone = await User.updateOne({ _id: to }, {
            $push: { friends: from },
            $pull: { reqFriends: from }
        });
        if (respone.nModified == 0) throw Error('Error database');
        var respone = await User.updateOne({ _id: from }, {
            $push: { friends: to },
            $pull: { reqFriends: to }
        });
        if (respone.nModified == 0) throw Error('Error database');
        return true;
    }
    async findUser(userID) {
        var user = await User.findById(userID, ['username', 'avatar', '_id']);
        if (user) return user;
        else return null;
    }
    async addConversation(conversation) {
        var res = await User.updateMany({ _id: { $in: conversation.users.map(u => u._id) } }, { $push: { conversations: conversation._id } })
        return res;
    }
}

module.exports = new UserService();