export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = 'http://localhost:5000/api' + path;

        let options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`
        }
        // console.log(options.headers)
        return fetch(url, options);
    }

    async getUser(emailAddress, password) {
        const response = await this.api('/users', 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else throw new Error()
    }

    async createUser(user) {
        const response = await this.api(`/users`, 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw new Error()
        }
    }

    async createCourse(course, emailAddress, password) {
        const response = await this.api(`/courses`, 'POST', course, true, { emailAddress, password });
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            }).c
        } else {
            throw new Error()
        }
    }

    async updateCourse(id, course, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password })

        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            }).catch(err => console.log(err))
        } else {
            throw new Error()
        }
    }

    async deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password })
        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })
        } else throw new Error()
    }
}