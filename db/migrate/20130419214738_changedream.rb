class Changedream < ActiveRecord::Migration
  def change
  	remove_column :dreamlogs, :dream
  	add_column :dreamlogs, :text, :string
  end
end
