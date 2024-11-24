const API_BASE_URL = 'http://localhost:8000/api';

export const endpoints = {
  // Auth endpoints
  auth: {
    login: `${API_BASE_URL}/auth/login/`,
    register: `${API_BASE_URL}/auth/register/`,
    logout: `${API_BASE_URL}/auth/logout/`,
    refreshToken: `${API_BASE_URL}/auth/token/refresh/`,
  },
  
  // User endpoints
  users: {
    profile: `${API_BASE_URL}/users/profile/`,
    updateProfile: `${API_BASE_URL}/users/profile/update/`,
    progress: `${API_BASE_URL}/users/progress/`,
  },

  // Roadmap endpoints
  roadmaps: {
    list: `${API_BASE_URL}/roadmaps/`,
    roleBasedList: `${API_BASE_URL}/roadmaps/role-based/`,
    skillsBasedList: `${API_BASE_URL}/roadmaps/skills-based/`,
    detail: (id) => `${API_BASE_URL}/roadmaps/${id}/`,
    userRoadmaps: `${API_BASE_URL}/roadmaps/user-roadmaps/`,
  },

  // Exercise endpoints
  exercises: {
    list: `${API_BASE_URL}/exercises/`,
    detail: (id) => `${API_BASE_URL}/exercises/${id}/`,
    submit: (id) => `${API_BASE_URL}/exercises/${id}/submit/`,
  },

  // AI features
  ai: {
    chat: `${API_BASE_URL}/ai/chat/`,
    generateRoadmap: `${API_BASE_URL}/ai/generate-roadmap/`,
    analyzeSkills: `${API_BASE_URL}/ai/analyze-skills/`,
  }
};

export const createApiClient = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return {
    get: async (url) => {
      const response = await fetch(url, { headers });
      return response.json();
    },
    post: async (url, data) => {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
      return response.json();
    },
    put: async (url, data) => {
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
      });
      return response.json();
    },
    delete: async (url) => {
      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      });
      return response.json();
    },
  };
};

export default endpoints;
