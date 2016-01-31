Websites = new Mongo.Collection("websites");
Websites.allow({
    insert: function (userId, doc) {
        return (userId && doc.owner === userId);
    },
    update: function (userId, doc, fields, modifier) {
        // can only change your own documents
        if (doc.owner === userId) {
            return true;
        }
        for(var i in fields) { // allow change only votes for all others
            var f = fields[i];
            if (['upvotes', 'downvotes', 'voters'].indexOf(f) === -1) {
                return false;
            }
        }
        return true;
    }
    //remove: function (userId, doc) {
    //  // can only remove your own documents
    //  return doc.owner === userId;
    //},
    //fetch: ['owner']
});

Comments = new Mongo.Collection("comments");
Comments.allow({
    insert: function (userId, doc) {
        console.log(userId, doc.owner);
        return (userId && doc.owner === userId);
    }
});