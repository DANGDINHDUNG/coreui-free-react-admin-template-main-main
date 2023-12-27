import request from '../utils/request'

export const getProjectResource = async () => {
  try {
    const response = await request.get('/ProjectResource/GetAll')
    // Success 🎉
    console.log(response)
    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log(error)
  }
}
export const createProjectResource = async (projectResource) => {
  try {
    const response = await request.post('/ProjectResource/AddProjectResource', projectResource)
    console.log(projectResource)
    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log(error)
  }
}
export const getProjectResourcebyID = async (id) => {
  try {
    const response = await request.get(`/ProjectResource/GetProjectResourceByID/${id}`)
    console.log(response)
    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log(error)
  }
}
export const updateProjectResource = async (id, projectResource) => {
  try {
    const response = await request.put(`/ProjectResource/UpdateProjectResource/${id}`, projectResource)
    console.log(projectResource)
    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log(error)
  }
}
export const deleteProjectResource = async (id) => {
  try {
    const response = await request.delete(`/ProjectResource/DeleteProjectResource/${id}`)
    return response.data
  } catch (error) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log(error)
  }
}
