<template>
  <div class="row">
    <div v-if="task" class="col s9 offset-m1 offset-l1 offset-s1">
      <h1>{{ task.title }}</h1>
      <p class="authorName">Author name: {{ task.authorName }}</p>
      <form @submit.prevent="submitHandler">
        <div class="chips" ref="chips"></div>
        <div class="input-field">
          <textarea  v-model="description" id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
        </div>
        <input type="text" ref="datepicker">
        <div class="btn-block">
          <div v-if="task.status !== 'completed'"  style="margin-right: 1rem">
            <button class="btn waves-effect waves-light" type="submit" style="margin-right: 1rem">Update task</button>
            <button class="btn waves-effect waves-light blue" type="button" @click="completeTask">Complete task</button>
          </div>
          <div class="switchingButtonsBlock" v-if="task.status == 'completed'">
            <button class="btn disabled" type="submit" style="margin-right: 1rem">Update task</button>
            <button class="btn blue disabled" type="button" @click="completeTask">Task completed</button>
          </div>
          <button class="btn waves-effect waves-light red" type="button" @click="deleteTask">Delete task</button>
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

  textarea {
    min-height: 150px;
  }

  .btn-block {
    display: flex;
  }

  .switchingButtonsBlock {
    margin-right: 1rem;
  }

  @media (max-width: 1000px) {
    h1 {
      font-size: 4rem;
    }
    textarea {
      min-height: 50px;
    }
    .btn-block {
      display: block;
      text-align: center;
    }
    .btn {
      width: 100%;
    }
    .switchingButtonsBlock {
      margin-right: 0!important;
    }

  }
  @media (max-width: 500px) {
    h1 {
      font-size: 3rem;
    }
    textarea {
      min-height: 130px;
    }
    .switchingButtonsBlock {
      margin-right: 0;
    }
  }
</style>