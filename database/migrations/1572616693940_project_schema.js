'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table
        .integer('user_id') //Todo projeto será guardado o ID do usuario
        .unsigned()        //Força o banco para que so tenha valor positivos
        .references('id')   // Nome do banco que quero me referenciar 
        .inTable('users')   //Qual tabela quero me referencia
        .onUpdate('CASCADE') //Se a tabela tiver atualização "Cascade" ele atualiza sozinho
        .onDelete('SET NULL') //O que fazer quando os dados forem deletados? Seta tudo como nulo
      table.string('tittle').notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
