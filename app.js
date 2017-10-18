const note = {
  template: `
    <div>笔记</div>
  `
}

const Notes = {
  components: {
    note: note
  },
  template: `
    <div>
      <a>添加笔记</a>
      <note></note>
      <note></note>
      <note></note>
    </div>
  `
}

const app = new Vue({
  el: '#app',
  components: {
    'notes': Notes
  },
  template:`
    <notes></notes>
  `
})
