module.exports= function(req,res,next){
  Todo.findOne({id: req.body.id}, function(err, todo){
    if(!todo){
      return res.json('todo dont found')
    }
    if(todo.owner===req.user.id){
      return next();
    }else{
      return res.json('need access for this')
    }
  })
};
