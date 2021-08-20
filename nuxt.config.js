export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-example",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    "@nuxtjs/feed"
  ],

  // feed: [
  //   {
  //     path: "/feed.xml", // The route to your feed.
  //     async create(feed) {
  //       feed.options = {
  //         title: "My Great blog",
  //         link: "https://vibrant-lamport-cf3906.netlify.app/feed.xml",
  //         description: "This is my personal feed!"
  //       };
  //       const { $content } = require("@nuxt/content");
  //       const posts = await $content("blog").fetch();

  //       posts.forEach(post => {
  //         const url = `https://vibrant-lamport-cf3906.netlify.app/blog/${post.slug}`;
  //         feed.addItem({
  //           title: post.title,
  //           date: new Date(post.date),
  //           link: url
  //         });
  //       });
  //     }, // The create function (see below)
  //     cacheTime: 1000 * 60 * 15, // How long should the feed be cached
  //     type: "rss2" // Can be: rss2, atom1, json1
  //   }
  // ],
  feed: async () => {
    const mainFeed = {
      path: "/feed.xml", // The route to your feed.
      async create(feed) {
        feed.options = {
          title: "My Great blog",
          link: "https://vibrant-lamport-cf3906.netlify.app/feed.xml",
          description: "This is my personal feed!"
        };
        const { $content } = require("@nuxt/content");
        const posts = await $content("blog").fetch();

        posts.forEach(post => {
          const url = `https://vibrant-lamport-cf3906.netlify.app/blog/${post.slug}`;
          feed.addItem({
            title: post.title,
            date: new Date(post.date),
            link: url
          });
        });
      }, // The create function (see below)
      cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: "rss2" // Can be: rss2, atom1, json1
    };
    const { $content } = require("@nuxt/content");
    const allAuthors = await $content("blog")
      .only(["author"])
      .fetch();
    const uniqueAuthors = allAuthors
      .map(obj => {
        return obj.author;
      })
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

    const feedArray = uniqueAuthors.map(author => {
      return {
        path: `/authors/${author}/feed.xml`,
        async create(feed) {
          feed.options = {
            title: `${author}'s Deepgram Posts`,
            link: `https://vibrant-lamport-cf3906.netlify.app/authors/${author}/feed.xml`,
            description: `This is ${author}'s personal feed!`
          };
          const posts = await $content("blog")
            .where("author", author)
            .fetch();

          posts.forEach(post => {
            const url = `https://vibrant-lamport-cf3906.netlify.app/blog/${post.slug}`;
            feed.addItem({
              title: post.title,
              date: new Date(post.date),
              link: url
            });
          });
        }, // The create function (see below)
        cacheTime: 1000 * 60 * 15, // How long should the feed be cached
        type: "rss2" // Can be: rss2, atom1, json1
      };
    });
    feedArray.push(mainFeed);
    return feedArray;
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
