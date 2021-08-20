<template>
  <article>
    <h1>{{ post.title }}</h1>
    <nuxt-link :to="`/blog/authors/${post.author}`"
      >Author: {{ post.author }}</nuxt-link
    >
    <nuxt-content :document="post" />
  </article>
</template>
<script>
export default {
  async asyncData({ $content, params, error, payload }) {
			const post = await $content('blog', params.slug).fetch()
			return { post }
	},
}
</script>
