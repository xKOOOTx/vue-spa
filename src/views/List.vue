<template>
  <div>
    <h1>List</h1>
    <div class="row">
      <div class="col s6 filter">
        <div class="input-field col">
          <select ref="select" v-model="filter">
            <option value="" disabled selected>Choose your option</option>
            <option value="active">Active</option>
            <option value="outdated">Outdated</option>
            <option value="completed">Completed</option>
          </select>
          <label>Status filter</label>
        </div>
        <button v-if="filter" class="btn btn-small red" @click="filter = null">Clear filter</button>
      </div>
      <div class="col s6 filter">
        <div class="input-field col">
          <select ref="nameSelect" v-model="nameFilter">
            <option value="" disabled selected>Choose your option</option>
            <option v-bind:value="task.authorName"
              v-for="task of displayTasks"
              :key="task.id"
            >{{ task.authorName }}</option>
          </select>
          <label>Name filter</label>
        </div>
        <button v-if="nameFilter" class="btn btn-small red" @click="nameFilter = null">Clear name filter</button>
      </div>
    </div>
    <hr>
    <table v-if="tasks.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author Name</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, idx) of displayTasks"
          :key="task.id"
        >
          <td>{{ idx + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.authorName }}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td class="td">
            <div class="text">{{ task.description }}</div>
          </td>
          <td>{{ task.status }}</td>
          <td>
            <router-link tag="button" class="waves-effect waves-light btn btn-small" :to="'/task/' + task.id">
              Open
            </router-link>
          </td>
          <td>
            <button class="waves-effect waves-light btn-floating btn-small rounded red" type="button" @click="deleteTask">x</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No tasks</p>
  </div>
</template>

<script>
export default {
  name: "List",
  data: () => ({
    filter: null,
    nameFilter: null,
  }),
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
    displayTasks() {
      return this.tasks.filter(t => {
        if (!this.filter) {
          return true
        }
        return t.status === this.filter
      })
    },
    displayByName() {
      return this.tasks.nameFilter(t => {
        if (!this.nameFilter) {
          return true
        }
        return t.status === this.nameFilter
      })
    },
  },
  methods: {
    deleteTask(task) {
      this.$store.commit('deleteTask', task);
    },
  },
  mounted() {
    M.FormSelect.init(this.$refs.select)
    M.FormSelect.init(this.$refs.nameSelect)
    M.Sidenav.init(this.$refs.sidenav);
  }
}
</script>

<style lang="scss" scoped>
  .td {
    max-width: 400px;
  }
  .text, .select {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .filter {
    display: flex;
    flex-direction: column;
  }
</style>