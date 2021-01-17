<template>
  <nav class="indigo darken-2">
    <div class="nav-wrapper">
      <router-link to="/list" class="brand-logo">Tasks</router-link>
      <a href="#" ref="sidenav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
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
</template>

<script>
export default {
  name: "Navbar",
  mounted() {
    M.Sidenav.init(this.$refs.sidenav);
  }
}
</script>

<style lang="scss" scoped>
  nav {
    padding: 0 2rem;
  }
  @media (min-width: 1000px) {

  }
</style>