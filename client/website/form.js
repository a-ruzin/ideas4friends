Template.website_form.events({
    "click .js-toggle-website-form": function (event) {
        $("#website_form").toggle('slow');
    },
    "submit .js-save-website-form": function (event) {

        // here is an example of how to get the url out of the form:
        var url = event.target.url.value;
        console.log("The url they entered is: " + url, Meteor.user()._id);

        var voters = {};
        voters[Meteor.user()._id] = 1;

        Websites.insert({
            title: event.target.title.value,
            url: event.target.url.value,
            description: event.target.description.value,
            createdOn: new Date(),
            owner: Meteor.user()._id,
            upvotes: 1,
            downvotes: 0,
            voters: voters
        });

        $('#add-website-dialog').modal('hide');
        Router.go('/');

        return false;// stop the form submit from reloading the page
    }
});
