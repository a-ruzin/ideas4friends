Template.website_form.events({
    "click .js-toggle-website-form": function (event) {
        $("#website_form").toggle('slow');
    },
    "submit .js-save-website-form": function (event) {

        var url = event.target.url.value;

        if (!url.match(/^https?:\/\//)) {
            $.bootstrapGrowl('bad url: '+url, {
                type: 'danger',
                align: 'right',
                delay: 5000
            });
            return false;
        }

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
