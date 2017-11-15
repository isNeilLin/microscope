Template.postEdit.onCreated(function() {
    Session.set('postEditErrors', {});
  });
  Template.postEdit.helpers({
    errorMessage: function(field) {
      return Session.get('postEditErrors')[field];
    },
    errorClass: function (field) {
      return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
    }
  });
Template.postEdit.events({ 
    'submit form': function(event){
        event.preventDefault();
        var currentPostId = this._id;
        var postAttributes = {
            _id: currentPostId,
            userId: this.userId,
            url: $('#url').val(),
            title: $('#title').val()
        }
        var errors = validatePost(postAttributes);
        if (errors.title || errors.url)
          return Session.set('postEditErrors', errors);
        Meteor.call('postUpdate', postAttributes, function(error, success) { 
            if (error) { 
                console.log('error', error);
                return throwError(error.reason);
            } 
            console.log(success)
            if (success.postExists) { 
                 return throwError('This link has already been posted（该链接已经存在）');
            }else if(success.deny){
                return Router.go('accessDenied');
            }
            Router.go('postPage', {_id: currentPostId});
        });
    },
    'click .delete': function(event) { 
         event.preventDefault();
         if(confirm('Delete this post?')){
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('Home');
         }
    } 
});