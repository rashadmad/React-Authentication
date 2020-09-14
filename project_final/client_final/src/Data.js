import config from './config'; 

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }
  //GETUSER
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  //CREATEUSER
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  //READ
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 400) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  //READ ALL
  async getCourses() {
    const response = await this.api(`/courses`, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status >= 400) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  //CREATE
  async createCourse(courseBody, emailAddress, password){
    const response = await this.api('/courses','POST', courseBody, true, {emailAddress, password});
    if (response.status === 200) {
      return []
    }
    else if (response.status === 401) {
      debugger
      return response.json().then(data => {
        console.log(data.errors)
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  //DELETE
  async deleteCourse(id, emailAddress, password) {
      const response = await this.api(`/courses/${id}`,'DELETE', null, true, {emailAddress, password});
      if (response.status === 204) {
        return [];
      }
      else if (response.status === 400) {
        return response.json().then(data => {
          console.log(data.errors)
          return data.errors;
        });
      }
      else {
        throw new Error();
      }
  }
  //UPDATE
  async updateCourses(courseBody, id, emailAddress, password){
    const response = await this.api(`/courses/${id}`,`PUT`, courseBody, true, {emailAddress, password});
    debugger
    if (response.status === 204 || response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        console.log(data.errors)
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
