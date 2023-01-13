import { ofetch } from "ofetch"
import { redirect, useNavigate } from "react-router-dom"
import { z } from "zod"

const apiInstance = ofetch.create({
  baseURL: "http://localhost:80/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  onRequest: ({ options }) => {
    const token = localStorage.getItem("token")
    options.headers = options.headers || {}
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    }
  },
  onResponse: ({ response }) => {
    if (response._data && 'token' in response._data && typeof response._data.token === 'string') {
      localStorage.setItem("token", response._data.token)
    }
  },
  onResponseError: ({ response }) => {
    if (response.status === 401) {
      window.location.href = "/connexion"
    }
  },
})

export const api = async <T>(request: Parameters<typeof apiInstance>[0], schema: z.ZodSchema<T>, options?: Parameters<typeof apiInstance>[1]) => {
  const data = await apiInstance(request, options)
  return schema.parse(data)
}
