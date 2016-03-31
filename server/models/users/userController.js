var User = require('./userModel.js'),

/*exmaple of how to make table relatonsips:
var User = sequelize.define('user', { name: Sequelize.STRING })
  , Task = sequelize.define('task', { name: Sequelize.STRING })
  , Tool = sequelize.define('tool', { name: Sequelize.STRING })

Task.belongsTo(User)
User.hasMany(Task)
User.hasMany(Tool, { as: 'Instruments' })


sequelize.sync().then(function() {
  // this is where we continue ...
})
*/


module.exports = {


  findAllUsers: function(req, res, next) {
    
    User.findAll({ }).then(function(users) {
      console.log(JSON.stringify(tasks));
    });
  },


  signup: function(req, res, next) {

    User
      .findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
      .spread(function(user, created) {
         console.log(user.get({
         plain: true
         }))
         console.log(created)

    /*EXAMPLE USER GOES HERE:
      {
        username: 'sdepold',
        job: 'Technical Lead JavaScript',
        id: 1,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      }
      created: true
    */
      });
  },


  signin: function(req, res, next) {

    //code goes here

  },


  checkAuth: function(req, res, next) {

    //code goes here

  }


};