class PostsController < ApplicationController

  #上記のPostsがrouteで設定したコントローラー名
  #下記のindexはroutesで設定したインデックス名

  def index  # indexアクションを定義した
      @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

end
