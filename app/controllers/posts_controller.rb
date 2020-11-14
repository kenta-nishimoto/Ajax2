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

  def checked
    post = Post.find(params[:id])
    # ↪︎パラメーターで送られた情報（id）が入っている
    
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    # ↪︎if文で既読かどうかを確認している

    item = Post.find(params[:id])
    # ↪︎上記で更新した情報をitemに入れている
    
    render json: {post:item}
    # ↪︎itemの情報をJSOn形式で「checked.js」に渡している


end
