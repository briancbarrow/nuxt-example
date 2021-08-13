<template>
  <main>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <NuxtLink :to="`/blog/${post.slug}`">{{post.title}}</NuxtLink>
      </li>
    </ul>
  </main>
</template>
<script>
export default {
  async asyncData({ $content }) {
			const posts = await $content('blog')
        .fetch()
			return { posts }
	},
}
</script>
