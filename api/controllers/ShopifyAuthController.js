const shopifyAPI = require("shopify-node-api");
const uuidv4 = require("uuid/v4");
const async = require("async");

module.exports = {
    startAuth: function(req, res) {
        /*
            { hmac: '5fbcce31a670d5eb78ac9e5ee90c0c419e9108b4980c1b1d5156c828ad39d190',
  shop: 'miller-furniture.myshopify.com',
  timestamp: '1499727553' }
        */
        const Stores = sails.models.store;
        const nonce = uuidv4();

        Stores.findOne({
            name: req.query.shop,
            accessToken: { "!": null }
        })
            .then(store => {
                req.session.store = store;
                res.locals.nonce = store.nonce;
                sails.hooks.http.app.expose(store.id, "App.Store.id");
                sails.hooks.http.app.expose(store.name, "App.Store.name");
                return res.redirect("/app");
            })
            .catch(err => {
                Stores.create({
                    name: req.query.shop,
                    nonce: nonce
                }).exec((err, data) => {
                    if (err) return res.serverError(err);
                    else {
                        const Shopify = new shopifyAPI({
                            shop: req.query.shop.replace(".myshopify.com", ""),
                            shopify_api_key: sails.config.presskitty.apiKey,
                            shopify_shared_secret:
                                sails.config.presskitty.secret,
                            redirect_uri:
                                "https://www.presskitty.ca/shopify_finish_auth",
                            shopify_scope:
                                "write_content, read_content, read_script_tags, write_script_tags, read_themes",
                            nonce: nonce
                        });
                        const auth_url = Shopify.buildAuthURL();
                        res.redirect(auth_url);
                    }
                });
            });
    },

    finishAuth: function(req, res) {
        const Stores = sails.models.store;
        const Missions = sails.models.mission;
        const Achievements = sails.models.achievement;
        const Milestones = sails.models.milestone;
        const About = sails.models.about;
        const Images = sails.models.image;
        const Team = sails.models.team;

        const suppliedNonce = req.query.state;

        Stores.findOne({
            nonce: suppliedNonce
        })
            .then(store => {
                const Shopify = new shopifyAPI({
                    shop: store.name.replace(".myshopify.com", ""),
                    shopify_api_key: sails.config.presskitty.apiKey,
                    shopify_shared_secret: sails.config.presskitty.secret,
                    nonce: store.nonce
                });

                Shopify.exchange_temporary_token(req.query, function(
                    err,
                    data
                ) {
                    if (err) return res.serverError(err);
                    else {
                        let storeId = store.id;
                        Stores.update(store.id, {
                            accessToken: data.access_token
                        })
                            .then(store => {
                                // create fake data for their stores.
                                async.parallel(
                                    [
                                        cb => {
                                            Missions.create({
                                                storeId: storeId,
                                                title: "Define your mission",
                                                subtitle:
                                                    "Give customers a way to identify with your store"
                                            }).exec(cb);
                                        },
                                        cb => {
                                            Achievements.create({
                                                name:
                                                    "Featured on the Shopify Blog",
                                                publicationName: "Shopify",
                                                publishLink:
                                                    "https://www.shopify.ca/blog/the-paint-brush-cover",
                                                imageUrl:
                                                    "https://websitesetup.org/wp-content/uploads/2016/03/shopify.png",
                                                type: "feature",
                                                storeId: storeId
                                            }).exec(cb);
                                        },

                                        cb => {
                                            Milestones.create([
                                                {
                                                    description:
                                                        "Customer Satisfaction Rating",
                                                    amount: "4",
                                                    type: "stars",
                                                    storeId: storeId
                                                },
                                                {
                                                    description:
                                                        "Happy Customers this year",
                                                    amount: "1500",
                                                    type: "number",
                                                    storeId: storeId
                                                }
                                            ]).exec(cb);
                                        },

                                        cb => {
                                            About.create({
                                                storeId: storeId,
                                                html: `"<h3>This is where you should write about your broad mission, vision, and what makes your store different.</h3><p>There are so many stores on the internet that you need to come up with a unique selling proposition. Then, you need to communicate this effectively to your customers and journalists. You need to give them a reason to care. </p><p>Here are some ideas of things that could set you apart:</p><ol><li>Great selection and curation process</li><li>Unique items (handmade, custom designed, etc.)</li><li>Great customer service, unique selling style, great refund and shipping policies. </li></ol><p><br></p>"`
                                            });
                                        },

                                        cb => {
                                            Images.create([
                                                {
                                                    storeId: storeId,
                                                    imageUrl:
                                                        "https://images.unsplash.com/photo-1496902526517-c0f2cb8fdb6a?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop=",
                                                    caption: "Meeting"
                                                },
                                                {
                                                    storeId: storeId,
                                                    imageUrl:
                                                        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop=",
                                                    caption: "Our workplace"
                                                }
                                            ]);
                                        },

                                        cb => {
                                            Team.create({
                                                storeId: storeId,
                                                name: "John Smith",
                                                position: "Founder",
                                                email: "",
                                                description:
                                                    "Write a short description about your team member here. You can talk about their role, interests, and more.",
                                                imageUrl:
                                                    "https://images.unsplash.com/photo-1496239943629-500dbbf945b1?dpr=2&auto=compress,format&fit=crop&w=376&h=251&q=80&cs=tinysrgb&crop="
                                            });
                                        }
                                    ],
                                    (err, results) => {
                                        req.session.store = store;
                                        res.locals.nonce = store.nonce;
                                        sails.hooks.http.app.expose(
                                            storeId,
                                            "App.Store.id"
                                        );
                                        sails.hooks.http.app.expose(
                                            store.name,
                                            "App.Store.name"
                                        );
                                        return res.redirect("/app");
                                    }
                                );
                            })
                            .catch(err => {
                                console.log(err);
                                return res.serverError(err);
                            });
                    }
                });
            })
            .catch(err => {
                console.log(err);
                return res.notFound();
            });
    },

    publish: function(req, res) {
        const Stores = sails.models.store;
        const store = req.session.store;

        const markup = req.body.markup;
        const cssStyles = req.body.css;
        const Shopify = new shopifyAPI({
            shop: store.name.split(".")[0],
            shopify_api_key: sails.config.presskitty.apiKey,
            shopify_shared_secret: sails.config.presskitty.secret,
            access_token: store.accessToken
        });

        const linktag = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.3/css/bulma.min.css">
        <link rel="stylesheet" href="https://www.presskitty.ca/styles/app.css">
        <link rel="stylesheet" href="https://www.presskitty.ca/styles/Template-Miller.css">
        `;

        const css = `<style>${cssStyles}</style>`;

        const pageData = {
            page: {
                author: "Press Kitty",
                body_html: linktag + css + markup,
                title: "Press",
                published: true
            }
        };

        // See if Store object has a `pageId`
        if (store.pageId) {
            console.log(
                `Updating Existing Press Kit with pageId ${store.pageId} for Store ID: ${store.id} `
            );
            // If it does, update the contents of the page with that id
            Shopify.put(`/admin/pages/${store.pageId}.json`, pageData, function(
                err,
                data
            ) {
                if (err) return res.serverError(err);
                else {
                    Stores.update(store.id, { pageId: data.page.id })
                        .then(() => {
                            return res.json(data);
                        })
                        .catch(err => {
                            return res.serverError(err);
                        });
                }
            });
        } else {
            console.log(`Publishing New Press Kit for Store ID: ${store.id} `);
            // If it does not, create a new page, get the new page ID and store it.
            Shopify.post("/admin/pages.json", pageData, function(err, data) {
                if (err) return res.serverError(err);
                else {
                    Stores.update(store.id, { pageId: data.page.id })
                        .then(() => {
                            req.session.store = store;
                            res.locals.nonce = store.nonce;
                            return res.json(data);
                        })
                        .catch(err => {
                            return res.serverError(err);
                        });
                }
            });
        }
    }
};
