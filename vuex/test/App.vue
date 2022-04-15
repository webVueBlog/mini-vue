<template>
 <div>
  {{$store.state.age}}
  {{$store.getters.getAge}}
  <button @click="$store.commit('changeAge',5)">同步更新</button>

  <button @click="$store.dispatch('changeAge',5)">异步更新状态</button>
 </div>
</template>