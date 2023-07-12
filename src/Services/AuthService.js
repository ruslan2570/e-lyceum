import ServerUrl from '../Const/ServerUrl';

class AuthService {

  async login(username, password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "login": username,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(ServerUrl + "auth.php", requestOptions)
      .then(response => {
        if (response.status === 200) {
          return response.text();
        } else {
          return false;
        }
      }
      )
      .then(text => {
        if (text) {
          let json = JSON.parse(text);
          localStorage.setItem('token', json.token);
        } else {
          alert("Неверный логин или пароль");
        }

      })
      .catch(error => console.log('error', error));

    // localStorage.setItem('token', response.data.token);

  }

  async validateToken(token) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "token": token
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    try {
      const response = await fetch(ServerUrl + "auth.php", requestOptions);
      return response.status === 200;
    } catch (error) {
      console.log('error', error);
      return false;
    }

  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    let token = this.getToken();
    if (token != null) {
      return this.validateToken(token);
    }
    return false;
  }
}

export default new AuthService();