function check() {
  const posts = document.querySelectorAll(".post");
  // ↪︎投稿された情報をクラス名から取得している
  posts.forEach(function(post){
    // ↪︎クラス名から取得した情報を一つずつ取り出している
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // このif文で何回もロードされることを防いでいる
    post.addEventListener("click",()=>{
      // ↪︎その取り出した情報にクリックをした時に動く動作を設定している
      const postId = post.getAttribute("data-id");
      // ↪︎これでメモのIDを取得している（これはXHR.openの際に必要になる）
      const XHR = new XMLHttpRequest();
      // ↪︎これでXMLHttpRequestを使用できるようにしている
      XHR.open("GET", `/posts/${postId}`, true);
      // ↪︎どのようなリクエストにするのか指定している
      XHR.responseType = "json";
      // ↪︎レスポンスの形式を指定している
      XHR.send();
      // ↪︎これでリクエストを送信している
      XHR.onload = () => {
        // ↪︎これ以下はコントローラーから処理が実行されて返って来る時の処理
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        // ↪︎if文で処理が実行できずエラーの際はアラートを出すように設定
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
    e.preventDefault();
  });
}
setInterval(check, 1000);
// ↪︎1行目のcheckからこの中に書かれているのはloadされた時の動作を一定期間ごとに行わせている