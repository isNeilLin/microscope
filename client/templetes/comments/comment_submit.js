Template.commentSubmit.onCreated(function(){
    Session.set('commentSubmitErrors',{})
})
Template.commentSubmit.helpers({ 
    errorClass(field){
        return !!Session.get('commentSubmitErrors')[fiels] ? 'has-error' : '';
    },
    errorMessage(field){
        return Session.get('commentSubmitErrors')[field]
    }
}); 

Template.commentSubmit.events({ 
    'submit form': function(event, template) { 
         event.preventDefault();
         var $body = $('#body');
         var comment = {
             body: $body.val(),
             postId: template.data._id
         }
         var errors = {};
         if(!comment.body){
             errors.body = 'Please write some content';
             return Session.set('commentSubmitErrors',errors)
         }
         Meteor.call('commentInsert',comment,function(error,result){
             if(error){
                 throwError(error.reason)
             }else{
                 $body.val('');
             }
         })
    } 
}); 
