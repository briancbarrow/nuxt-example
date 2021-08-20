<template>
  <main>
    <ul role="list" class="divide-y divide-gray-200">
      <li v-for="post in posts" :key="post.slug" class="flex py-4">
        <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>
<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content("blog").fetch();
    return { posts };
  }
};
</script>
