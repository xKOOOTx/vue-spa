<template>
  <div class="row">
    <div class="col s9 offset-m1 offset-l1 offset-s1">
      <h1>Create task</h1>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input id="title" v-model="title" type="text" class="validate" required>
          <label for="title">Title</label>
          <span class="helper-text" data-error="Title required"></span>
        </div>
        <div class="input-field">
          <input id="author_name" v-model="authorName" type="text" class="validate" required>
          <label for="author_name">Author Name</label>
          <span class="helper-text" data-error="Title required"></span>
        </div>
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
        </div>
        <input type="text" ref="datepicker">
        <button class="waves-effect waves-light btn" type="submit">Create task</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'create',
  data: () => ({
    description: '',
    title: '',
    chips: null,
    date: null,
    authorName: '',
  }),
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags',
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: 'true'
    });
  },
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        authorName: this.authorName,
        description: this.description,
        id: Date.now(),
        status: 'active',
        tags: this.chips.chipsData,
        date: this.date.date
      }
      this.$store.dispatch('createTask', task)
      this.$router.push('/list')
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~materialize-css/";

</style>