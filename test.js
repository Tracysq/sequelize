const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize('qdd', 'root', '123456', {
    dialect: 'mysql'
});

// 创建 User 模型
class User extends Model {
}

// 初始哈 User
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, {sequelize, modelName: 'user'});

(async () => {
    // 同步到数据库
    await sequelize.sync();
    // 创建一条数据
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    // 打印结果
    console.log(jane.toJSON());

    await User.destroy({
        where: {
            id: 1
        }
    });
    const users = await User.findAll();
    console.log(JSON.stringify(users));
    await sequelize.close()
})();

