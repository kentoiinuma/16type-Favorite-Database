# frozen_string_literal: true

# このクラスはusersテーブルを更新するマイグレーションを定義します。
class UpdateUsersTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :name
    remove_column :users, :avatar
    add_column :users, :clerk_id, :string
  end
end
