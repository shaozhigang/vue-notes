const Editor = {
  props: [
    'entityObject'
  ],
  data() {
    return {
      entity: this.entityObject
    }
  },
  template: `
    <div class="ui form">
      <div class="field">
        <textarea
          row="5"
          placeholder="写点东西..."
          v-model="entity.body">
        </textarea>
      </div>
    </div>
  `
}
const Note = {
  props: [
    'entityObject'
  ],
  data() {
    return {
      entity: this.entityObject,
      open: false
    }
  },
  components: {
    'editor': Editor
  },
  template: `
    <div class="item">
      <div class="content">
        <div class="header" v-on:click="open = !open">
          {{ entity.body || '新建笔记'}}
        </div>
        <div class="extra">
          <editor
            v-bind:entity-object="entity"
            v-if="open"></editor>
        </div>
      </div>
    </div>
  `
}

const Notes = {
  data() {
    return {
      entities: {}
    }
  },
  /* 实例创建之后会调用 created */
  created() {
    loadCollection('notes')
      .then(collection => {
        const _entities = collection.chain()
          .find()
          .simplesort('$loki', 'isdesc')
          .data()
        this.entities =  _entities
        console.log(this.entities)
      })
  },
  methods: {
    create(){
      loadCollection('notes')
        .then((collection) => {
          const entity = collection.insert({
            body: ''
          })
          db.saveDatabase()
          this.entities.unshift(entity)
        })
    }
  },
  components: {
    note: Note
  },
  template: `
    <div class="ui container notes">
      <h4 class="ui horizontal divider header">
        <i class="paw icon"></i>
        Hobo Notes App _ Vue.js
      </h4>
      <a class="ui right floated basic violet button"
      v-on:click="create">添加笔记</a>
      <div class="ui divided items">
        <note
        v-for="entity in entities"
        v-bind:entityObject="entity"
        v-bind:key="entity.$loki">
        </note>
      </div>
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
