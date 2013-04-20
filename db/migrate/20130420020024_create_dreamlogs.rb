class CreateDreamlogs < ActiveRecord::Migration
  def change
    create_table :dreamlogs do |t|
      t.string :text

      t.timestamps
    end
  end
end
