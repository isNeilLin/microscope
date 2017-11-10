Template.postSubmit.onCreated(function(){
    Session.set('postSubmitErrors',{});
})
Template.postSubmit.helpers({
    errorMessage: function(field){
        return Session.get('postSubmitErrors')[field]
    },
    errorClass: function(field){
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});
Template.postSubmit.events({ 
    'submit form': function(event) { 
         event.preventDefault();
         var post = {
             url: $('#url').val(),
             title: $('#title').val()
         }
         var error = validatePost(post);
         if(error.title || error.url){
             return Session.set('postSubmitErrors',error)
         }
         Meteor.call('postInsert', post, function(error, success) { 
             if (error) { 
                 console.log('error', error);
                 return throwError(error.reason)
             } 
             if(success.postExists){
                throwError('This link has already been posted（该链接已经存在）');
             }
             Router.go('postPage',{_id:success._id})
         });
    } 
});