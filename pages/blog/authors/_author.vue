<template>
  <div class="px-4 pt-16 pb-20 bg-white sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div
      class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl"
    >
      <div>
        <h2
          class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
        >
          {{ author }}
        </h2>
        <div
          class="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center"
        ></div>
      </div>
      <div class="grid gap-16 pt-10 mt-6 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        <div v-for="post in posts" :key="post.title">
          <p class="text-sm text-gray-500">
            <time :datetime="post.datetime">{{ post.date | date }}</time>
          </p>

          <p class="text-xl font-semibold text-gray-900">
            {{ post.title }}
          </p>
          <div class="mt-3">
            <nuxt-link
              :to="post.path"
              class="text-base font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Read full article
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params, error, payload }) {
    const posts = await $content("blog")
      .where({
        author: params.author
      })
      .fetch();
    return { author: params.author, posts };
  },
  filters: {
    date: function(date) {
      return new Date(date).toDateString();
    }
  }
};
</script>

<style lang="scss"></style>
