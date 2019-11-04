'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table
        .integer('project_id') //Toda tarefa vai pertencer a 1 projeto
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE') //Quando uma tabela for deletada tudo é
      table
        .integer('user_id') //Relacionar tarefas com "user-id"
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')  
      table //Relacionamento da tarefa com o arquivo
      .integer('file_id') 
      .unsigned()
      .references('id')
      .inTable('files')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')  
      table.string('tittle').notNullable()
      table.text('description')
      table.timestamp('due_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
