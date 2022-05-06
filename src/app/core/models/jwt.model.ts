export class JwtResponseModel {

  token: string | undefined;
  refreshToken: string | undefined;

  constructor(){
  }

  setToken(token: string){
    this.token = token;
  }

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

}
