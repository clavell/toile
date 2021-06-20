<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style>
:root {
  --main-background-colour: #171a1d;
  --list-background-colour: #ad1448;
  --entry-background-colour: #c41751;
  --entry-size: 100px;
  --list-font-colour: white;
  --calendar-height: 90vh;

  --sidebar-color: #1e1e1e;
  --sidebar-text-colour: #e6e6e6;
  --sidebar-width: 100px;

  --scroll-bar-width: 15px;
  --border-radius: 10px;

  --top-thickness: 35px;
  --top-colour: #101010;

  --timesegment-height: 40px;
  --timesegment-separator-thickness: 1px;
  --timesegment-separator-colour: #464646;
  --timesegment-colour: #282828;

  --secondary-timesegment-separator-colour: #37383a;

  --body-color: #141414;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: var(--main-background-colour);
}

body::-webkit-scrollbar-track {
  background: var(--list-background-colour);
}

body {
  background-color: var(--main-background-colour);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
