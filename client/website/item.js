/////
// template events
/////
//Template.website_item.helpers({
//    upvotes: function() {
//        var upvotes = 0;
//        for (var userId in this.voters) {
//            if (this.voters[userId] > 0) {
//                upvotes += 1;
//            }
//        }
//        return upvotes;
//    },
//    downvotes: function() {
//        var downvotes = 0;
//        for (var userId in this.voters) {
//            if (this.voters[userId] < 0) {
//                downvotes += 1;
//            }
//        }
//        return downvotes;
//    }
//});
//
Template.website_item.events({
    "click .js-upvote": function (event) {
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        var user_id = Meteor.user()._id;
        if (this.voters == undefined) {
            this.voters = {};
            this.upvotes = 0;
            this.downvotes = 0;
        }
        if (user_id in this.voters) {
            if (this.voters[user_id] === -1) {
                this.upvotes++;
                this.downvotes--;
                this.voters[user_id] = 1;
            }
        } else {
            this.upvotes++;
            this.voters[user_id] = 1;
        }
        Websites.update(website_id, {$set: {upvotes: this.upvotes, downvotes: this.downvotes, voters: this.voters}});
        return false;// prevent the button from reloading the page
    },
    "click .js-downvote": function (event) {

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        var user_id = Meteor.user()._id;
        if (this.voters == undefined) {
            this.voters = {};
            this.upvotes = 0;
            this.downvotes = 0;
        }
        if (user_id in this.voters) {
            if (this.voters[user_id] === 1) {
                this.upvotes--;
                this.downvotes++;
                this.voters[user_id] = -1;
            }
        } else {
            this.downvotes++;
            this.voters[user_id] = -1;
        }
        // put the code in here to remove a vote from a website!
        Websites.update(website_id, {$set: {upvotes: this.upvotes, downvotes: this.downvotes, voters: this.voters}});
        return false;// prevent the button from reloading the page
    }
});
Template.website_detail.helpers({
    comments: function () {
        console.log(this._id);
        return Comments.find({website_id: this._id}, {sort: {createdOn: -1}});
    }
});
Template.website_detail.events({
    "submit .js-website-comment": function (event) {
        var website_id = this._id;
        var user = Meteor.user();
        var user_title = user.profile
            ? user.profile.name
            : user.emails[0].address;
        console.log('hi', website_id, user_title);
        Comments.insert({
            website_id: website_id,
            author: user_title,
            owner: user._id,
            createdOn: new Date(),
            comment: event.target.comment.value,
            gravatar_img: Gravatar.imageUrl(user.emails[0].address)
        });
        return false;
    }
});
