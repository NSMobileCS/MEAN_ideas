const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Idea = mongoose.model('Idea');
const Like = mongoose.model('Like');
const User = mongoose.model('User');





module.exports = {

    //post to login
    login: function (req, res) {
        let userName = req.body.name;
        console.log(userName);
        User.findOne(
            {'name': userName},
            (err, user) => {
                if (user) {
                    console.log(`existing user ${user.name}, ${user._id} found` );
                    req.session.user = {
                        name: user.name,
                        id: user._id
                    };
                    return res.json(req.session.user);
                } else {
                    user = User( {'name': userName} );
                    user.save(
                        (err, user) => {
                            if (user) {
                                console.log(`new user ${user.name}, ${user._id} added` );
                                req.session.user = {
                                    name: user.name,
                                    id: user._id
                                };
                                return res.json(req.session.user);
                            }
                            if (err) return res.json(err);
                        }
                    )
                }

            }
        );
    },

    logout: function(req, res) {
        req.session.destroy( () => res.json({'ok':true}) )
    },

    users: function (req, res) {
        User.find(
            {},
            (err, users) => {
                if (err) {
                    return res.json(err);
                } else {
                    return res.json(users);
                }
            }
        )
    },

    getUser: function (req, res) {
        if (req.session.user && req.session.user.name && req.session.id ) {
            return res.json(req.session.user);
        } else {
            return res.status(400).json({errors: ["not logged in"]});
        }
    },

    ideas: function (req, res) {
        Idea.find(
            {},
            (err, ideas) => {
                if (err) {
                    return res.json(err);
                } else {
                    return res.json(ideas);
                }
            }
        )
    },

    oneIdea: function (req, res) {
        Idea.findOne(
            {_id: req.params.id},
            (err, idea) => {
                if (err) console.log(err);
                User.findOne(
                    {_id: idea.userID},
                    (err, author) => {
                        Like.count(
                            {"ideaID": idea._id},
                            (err, likeCount) => {
                                if (err) return res.json(err);
                                console.log(`likeCount: ${likeCount}`);
                                return res.json(
                                    {
                                        author: author.name,
                                        likes: likeCount,
                                        body: idea.body
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );

    },

    newIdea: function (req, res) {
        if (!(req.session.user && req.session.user.name && req.session.user.id)) {
            return res.status(400).json({errors: ["not logged in"]});
        } else {
            Idea.create(
                {
                    'body': req.body.body,
                    'userID': req.session.user.id
                },
                (err, idea) => {
                    if (err) return res.json(err);
                    return res.json({"ok": true})
                }
            );
        };
    },

    like: function (req, res) {
        if (req.session.user) {
            Like.create(
                {
                    'userID': req.session.user.id,
                    'ideaID': req.params.id
                },
                (err, idea) => {
                    if (err) return res.json(err);
                    return res.json({"ok": true});
                }
            );
        } else {
            return res.json({"error": "please log in"});
        }
   }
}

// function reqSignedIn(req, res, next) {
//     if (req.session.user) {
//         next(req, res, );
//     } else {
//         res.redirect('/')
//     }
// }