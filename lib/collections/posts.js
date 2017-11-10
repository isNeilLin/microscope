Posts = new Mongo.Collection('posts'); 

Meteor.methods({ 
    postInsert: function(postAttributes) { 
        check(Meteor.userId(),String)
        check(postAttributes,{
            url: String,
            title: String
        })
        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if(postWithSameLink){
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }
        var user = Meteor.user();
        var post = Object.assign({},postAttributes,{
            userId: user._id,
            author: user.username,
            submitted: new Date()
        })
        var postId = Posts.insert(post);
        return {
            _id: postId
        }
    } 
});

