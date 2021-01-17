<template>
  <div>
    <nav class="indigo darken-2">
      <div class="nav-wrapper">
        <router-link to="/list" class="brand-logo">Tasks</router-link>
        <a href="#" ref="sideNav" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <router-link
              tag="li"
              to="/"
              exact
              active-class="active"
          >
            <a href="#">Create</a>
          </router-link>
          <router-link
              tag="li"
              to="/list"
              active-class="active"
          >
            <a href="#">List</a>
          </router-link>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
      <router-link
          tag="li"
          to="/"
          exact
          active-class="active"
      >
        <a href="#">Create</a>
      </router-link>
      <router-link
          tag="li"
          to="/list"
          active-class="active"
      >
        <a href="#">List</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  mounted() {
  },
  methods: {
  },
  destroyed() {
    if (this.Sidenav && this.Sidenav.destroy) {
      this.Sidenav.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
  nav {
    padding: 0 2rem;
  }

</style>