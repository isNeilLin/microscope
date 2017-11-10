Template.postSubmit.events({ 
    'submit form': function(event) { 
         event.preventDefault();
         var post = {
             url: $('#url').val(),
             title: $('#title').val()
         }
         Meteor.call('postInsert', post, function(error, success) { 
             if (error) { 
                 console.log('error', error);
                 return alert(error.reason)
             } 
             if(success.postExists){
                alert('This link has already been posted（该链接已经存在）');
             }
             Router.go('postPage',{_id:success._id})
         });
    } 
});