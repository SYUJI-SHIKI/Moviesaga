class ProfilesController < ApplicationController
  def show
    @movies = current_user.favorite_movies
    @collections = current_user.bookmark_collections
  end

  def edit
    @user = User.find(current_user.id)
  end

  def update
    @user = User.find(current_user.id)
    if @user.update(user_params)
      redirect_to profile_path, success: t('defaults.flash_message.updated', item: User.model_name.human)
    else
      flash.now[:danger] = t('defaults.flash_message.not_updated', item: User.model_name.human)
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
