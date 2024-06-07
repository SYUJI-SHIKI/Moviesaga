class CollectionsController < ApplicationController
  def index
    @collections = Collection.includes(:movies)
  end

  def new
    @collection = Collection.new
    @movies = current_user.favorite_movies
  end

  def create
    @collection = current_user.collections.build(collection_params)
    if @collection.save
      redirect_to collections_path, notice: '特集記事が作成されました。'
    else
      @movies = current_user.favorite_movies
      flash.now[:alert] = '映画は1本以上選択してください'
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @collection = Collection.find(params[:id])
    @movies = @collection.movies
  end

  def edit
    @collection = current_user.collections.find(params[:id])
    @movies = @collection.movies
    @add_movies = current_user.favorite_movies.where.not(id: @movies.pluck(:id))
  end

  def update
    @collection = current_user.collections.find(params[:id])
    @movies = current_user.favorite_movies
    if @collection.update(collection_params)
      redirect_to collection_path(@collection), notice: '特集記事を更新しました'
    else
      flash.now[:alert] = '映画は1本以上選択してください'
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    collection = current_user.collections.find(params[:id])
    collection.destroy!
    redirect_to collections_path, status: :see_other
  end

  def my_lists
    @collections = current_user.collections
  end

  def bookmark
    @collections = current_user.bookmarks.includes(:collection).map(&:collection)
  end

  private

  def collection_params
    params.require(:collection).permit(:title, :description, movie_ids: [])
  end
end
