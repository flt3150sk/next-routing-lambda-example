import { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  const { request } = event.Records[0].cf;

  // "/" へのリクエストはそのまま処理する
  if (request.uri === "/") return request;

  // ファイル名 ("/" で区切られたパスの最後) を取得
  const filename = request.uri.split("/").pop();

  // ファイル名が "/" で終わる場合、末尾の "/" を除去してリダイレクト
  if (!filename) {
    return {
      status: "302",
      statusDescription: "Found",
      headers: {
        location: [
          {
            key: "Location",
            value: request.uri.replace(/\/+$/, "") || "/",
          },
        ],
      },
    };
  }

  /**
   * ここに dynamic routing 用の変換を書く必要がある
   * ex: `/users/${userId}`の時
   */
  const regex = new RegExp(/users\/[0-9]{1,}$/);
  if (regex.test(request.uri)) request.uri = '/users/[id]';

  // ファイル名に拡張子がついていない場合、 ".html" をつける
  if (!filename.includes(".")) request.uri = request.uri.concat(".html");

  return request;
};
