<template>
  <div>{{ todoCount }}</div>
</template>

<script lang="ts">
  import MyVue from './MyVue';
  import Component from 'vue-class-component';

  @Component({})
  export default class TodoMvc extends MyVue {
    get todoCount() {
      return this.store.getters.count;
    }
  }
</script>
