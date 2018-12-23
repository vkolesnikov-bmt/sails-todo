/**
 * TodoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  addTodo: function(req, res){
    let newTodo = {task: req.body.task, status: req.body.status, owner: req.user};
    Todo.create(newTodo, function(err, todo){
      if(err){
        res.serverError(err)
      }
      else{
        res.send(todo)
      }
    })
  },

  editTodo: function(req, res){
    if(!req.body.task){
      Todo.update({id: req.body.id}, {status: req.body.status}, function(err, todo){
        if(err) return res.send(err);
        res.send('edit success');
      })
    }else{
      Todo.update({id: req.body.id}, {task: req.body.task}, function(err, todo) {
        if(err) return res.send(err);
        res.send('edit success');
      })
    }
  },

  deleteTodo: function(req, res){
    Todo.destroy({id: req.body.id}, function(err){
      if(err) {
        return res.json(err);
      }
      return res.json('delete success');
    })
  },

  deleteAll: function(req, res){
    Todo.destroy({}, function(err){//owner: req.user.id add in function attributes
      if(err){
        return res.json(err)
      }
      return res.json('delete all success')
    })
  },
  deleteAllCompleted: function(req,res){
      Todo.destroy({status: true}, function(err){ //owner: req.user.id add in function attributes
        if(err){
          return res.json(err)
        }
        return res.json('Delete all completed')
      })
    },

  changeStatusAll: function(req,res){
    let stat = req.body.status === "true";
    Todo.update({ status: !stat}, {status: stat}, function(err, records){//owner: req.user.id add in function attributes
      if(err){
        return res.json(err)
      }
      return res.send(200, records)
    })
  },

  getTodoList: function(req,res){
    Todo.find({}, function(err,records){//owner: req.user.id add in function attributes
      if(err){
        return res.json(err)
      }
      return res.send(records)
    })
  }
};

