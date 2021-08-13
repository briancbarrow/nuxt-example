<template>
  <article>
    <h1>{{post.title}}</h1>
    <p>Author: {{post.author}}</p>
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
