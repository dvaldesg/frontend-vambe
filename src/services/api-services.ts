import { apiClient } from '@/lib/api-client'

export const userService = {
  async getCurrentProfile() {
    return apiClient.get<{
      id: number;
      createdAt: string;
      updatedAt: string;
      email: string;
      role: string;
      firstName?: string;
      lastName?: string;
    }>('/users/me');
  },
};
