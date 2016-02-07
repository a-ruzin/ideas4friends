// helper function that returns all available websites
Template.website_list.helpers({
    websites: function () {
        var filter = Session.get('searchfilter');
        if (filter && filter !== '') {
            var regex = new RegExp(filter, 'i')
            return Websites.find({
                $or: [
                    {url: {$regex: regex}},
                    {title: {$regex: regex}},
                    {description: {$regex: regex}}
                ]
            }, {
                sort: {upvotes: -1, downvotes: 1}
            });
        }
        else {
            return Websites.find({}, {sort: {upvotes: -1, downvotes: 1}});
        }
    }
});


