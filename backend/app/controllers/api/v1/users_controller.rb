# frozen_string_literal: true

# API V1 名前空間のルートモジュール
module Api
  # V1 名前空間のルートモジュール
  module V1
    # clerkユーザーに関連するアクションを処理するコントローラー
    class UsersController < ApplicationController
      def show
        clerk_id = params[:id]
        clerk_user = fetch_clerk_user(clerk_id)
        render_clerk_user(clerk_user)
      rescue StandardError => e
        handle_user_fetch_error(e)
      end

      private

      def fetch_clerk_user(clerk_id)
        clerk = Clerk::SDK.new
        clerk.users.find(clerk_id)
      end

      def render_clerk_user(clerk_user)
        render json: {
          profile_image_url: clerk_user['profile_image_url'],
          username: clerk_user['username']
        }
      end

      def handle_user_fetch_error(error)
        Rails.logger.error "Error: #{error.message}"
        render json: { error: 'Unable_to_fetch_user_data' }, status: :unprocessable_entity
      end
    end
  end
end