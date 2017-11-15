Template.postItem.helpers({
    ownPost(){
        return this.userId === Meteor.userId()
    },
    domain(){
        var a = document.createElement('a');
        a.href = this.url;
        return a.hostname;
    },
    upvotedClass(){
        var userId = Meteor.userId();
        if (userId && !_.include(this.upvoters, userId)) {
            return 'btn-primary upvotable';
        } else {
            return 'disabled';
        }
    }
}); 
Template.postItem.events({ 
    'click .upvotable': function(event) { 
         event.preventDefault();
         Meteor.call('upvote',this._id)
    } 
});
 
