<template>
  <!-- <article>
    <h1>{{ post.title }}</h1>
    <nuxt-link :to="`/blog/authors/${post.author}`"
      >Author: {{ post.author }}</nuxt-link
    >
    <nuxt-content :document="post" />
  </article> -->
  <article class="relative px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col mx-auto mt-10 text-lg max-w-prose">
      <h1>
        <span
          class="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl"
          >{{ post.title }}</span
        >
      </h1>
      <nuxt-link
        class="m-auto text-indigo-600"
        :to="`/blog/authors/${post.author}`"
        >Author: {{ post.author }}</nuxt-link
      >
    </div>
    <div class="mx-auto mt-6 prose prose-lg text-gray-500 prose-indigo">
      <nuxt-content :document="post" />
    </div>
  </article>
</template>
<script>
export default {
  async asyncData({ $content, params, error, payload }) {
    const post = await $content("blog", params.slug).fetch();
    return { post };
  }
};
</script>
