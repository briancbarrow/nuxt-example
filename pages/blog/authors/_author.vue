<template>
  <div></div>
</template>

<script>
export default {
  async asyncData({ $content, params, error, payload }) {
    const posts = await $content("blog")
      .where({
        author: params.author
      })
      .fetch();
    return { posts };
  }
};
</script>

<style lang="scss"></style>
