Posts = new Mongo.Collection('posts'); 

Posts.allow({
    remove: function(userId,post){
        return ownsDocument(userId,post)
    }
})

validatePost = function (post) {
    var errors = {};
    if (!post.title)
      errors.title = "请填写标题";
    if (!post.url)
      errors.url =  "请填写 URL";
    return errors;
}

Meteor.methods({ 
    postInsert: function(postAttributes) { 
        check(Meteor.userId(),String)
        check(postAttributes,{
            url: String,
            title: String
        })
        var errors = validatePost(postAttributes);
        if(errors.title || errors.url){
            throw new Meteor.Error('invalid-post','你必须为你的帖子填写标题和URL')
        }
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
            submitted: new Date(),
            commentsCount: 0,
            upvoters: [],
            votes: 0
        })
        var postId = Posts.insert(post);
        return {
            _id: postId
        }
    },
    postUpdate: function(postAttributes){
        check(postAttributes,{
            _id: String,
            userId: String,
            url: String,
            title: String
        })
        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if(postWithSameLink&&postWithSameLink._id!==postAttributes._id){
            return {
                postExists: true
            }
        }
        if(postAttributes.userId!==Meteor.userId()){
            return {
                deny: true
            }
        }
        var errors = validatePost(postAttributes);
        if(errors.title || errors.url){
            throw new Meteor.Error('invalid-post','你必须为你的帖子填写标题和URL')
        }
        var newPost = Posts.update(postAttributes._id,{$set: {
            url: postAttributes.url,
            title: postAttributes.title
        }})
        return newPost;
    },
    upvote: function(postId){
        check(this.userId, String);
        check(postId, String);
        console.log(postId)
        var newPost = Posts.update({
            _id: postId,
            upvoters: {$ne: this.userId}
        },{
            $addToSet: {upvoters: this.userId},
            $inc: {votes: 1}
        })
        if(!newPost){
            throw new Meteor.Error('invalid', "You weren't able to upvote that post");
        }
        return newPost;
    }
});

