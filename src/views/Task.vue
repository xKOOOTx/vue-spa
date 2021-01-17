<template>
  <div class="row">
    <div v-if="task" class="col s9 offset-m1 offset-l1 offset-s1">
      <h1>{{ task.title }}</h1>
      <p class="authorName">Author name: {{ task.authorName }}</p>
      <form @submit.prevent="submitHandler">
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea style="min-height: 150px" v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
        </div>
        <input type="text" ref="datepicker">
        <div style="display: flex;">
          <div v-if="task.status !== 'completed'"  style="margin-right: 1rem">
            <button class="btn" type="submit" style="margin-right: 1rem">Update task</button>
            <button class="btn blue" type="button" @click="completeTask">Complete task</button>
          </div>
          <button class="btn" type="button" @click="deleteTask">Delete task</button>
        </div>
      </form>
    </div>
    <h1 v-else>Task not found</h1>
  </div>
</template>

<script>
export default {
name: "Task",
  computed: {
  task() {
    return this.$store.getters.taskById(+this.$route.params.id)  }
  },
  data: () => ({
    description: '',
    chips: null,
    date: null,
  }),
  mounted() {
  this.description = this.task.description
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags',
      data: this.task.tags
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.task.date),
      setDefaultDate: 'true'
    })
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  methods: {
    submitHandler() {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        date: this.date.date
      })
      this.$router.push('/list')
    },
    completeTask() {
      this.$store.dispatch('completeTask', this.task.id)
      this.$router.push('/list')
    },
    deleteTask(task) {
      this.$store.commit('deleteTask', task);
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
  .authorName {
    border-bottom: 1px solid #ccc;
  }
</style>