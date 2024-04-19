import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import File from 'react'

export default class extends BaseSchema {
  protected tableName = 'competicoes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome').notNullable().unique()
      table.string('data').notNullable() 
      table.text('descricao', 'longtext').notNullable()
      table.string('linkBoletim')
      table.specificType('arqBoletim', File).notNullable()
      table.string('linkInscricao')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
