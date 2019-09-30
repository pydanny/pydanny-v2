<template>
  <div class="card">
    <img :src="image" :alt="title" v-if="image" class="card-image" :width="width" />
    <div class="card-content">
      <div class="card-header">
        <h3 class="card-title" v-if="title">{{title}}</h3>
        <h4 class="card-description" v-if="description">{{description}}</h4>
      </div>
      <div class="card-body">
        <p class="card-text" v-if="text">{{text}}</p>
      </div>
      <hr />
      <div class="card-footer" v-if="actions">
        <div v-for="action in actions">
          <a :href="action.link" target="_blank" rel="noopener">{{action.text}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["image", "title", "text", "description", "actions", "width"]
};
</script>

<style lang="stylus">
.card {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-radius: 10px;
  margin: 10px;
}

.card a {
  text-decoration: none;
}

.card-image {
  max-width: 100%;
  border-radius: 10px;
}

.card-title {
  margin: 0 auto;
}

.card-description {
  color: slategray;
  margin: 0px auto;
  font-weight: 600;
}

.card-text {
  color: #333;
}

.card-footer a:hover {
  text-decoration: underline;
}

.card.horizontal {
  display: flex;
  flex-direction: row;

  .card-content {
    margin: 20px;
  }

  @media (max-width: 678px) {
    flex-direction: column;
  }
}
</style>