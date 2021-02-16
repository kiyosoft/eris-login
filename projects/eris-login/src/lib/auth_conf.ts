export interface AuthConf {
  authority: string;
  client_id: string;
  redirect_uri: string;
  silent_redirect_uri: string;
  post_logout_redirect_uri: string;
  response_type: string;
  scope: string;
}
