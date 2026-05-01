import axiosInstance from './axios';

export type ListResponse<O = unknown> = {
  elements: O[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};

export const getList = async <O>(endpoint: string, page: number, size: number, params: Record<string, any> = {}): Promise<O[]> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: size.toString(),
      ...params
    });

    const response = await axiosInstance.get<ListResponse<O>>(`${endpoint}?${queryParams.toString()}`);
    return response.data.elements;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const getAll = async <O>(endpoint: string, params: Record<string, any> = {}): Promise<O[]> => {
  try {
    const queryParams = new URLSearchParams(params);
    const response = await axiosInstance.get<ListResponse<O>>(`${endpoint}?${queryParams.toString()}`);
    return response.data.elements;
  } catch (error) {
    console.error(`Error fetching all data from ${endpoint}:`, error);
    throw error;
  }
};

export const postList = async <O>(endpoint: string, data: Record<string, any>): Promise<O> => {
  try {
    const response = await axiosInstance.post<O>(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
};

export const putList = async <O>(endpoint: string, data: Record<string, any>): Promise<O> => {
  try {
    const response = await axiosInstance.put<O>(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating data at ${endpoint}:`, error);
    throw error;
  }
};

export const deleteList = async (endpoint: string, params: Record<string, any> = {}): Promise<void> => {
  try {
    const queryParams = new URLSearchParams(params);
    await axiosInstance.delete(`${endpoint}?${queryParams.toString()}`);
  } catch (error) {
    console.error(`Error deleting data from ${endpoint}:`, error);
    throw error;
  }
};

export interface ApiResponse<T> {
  code: number;
  result: T;
}

export const getById = async <O>(endpoint: string, id: string): Promise<O> => {
  try {
    const response = await axiosInstance.get<ApiResponse<O>>(`${endpoint}/${id}`);
    return response.data.result;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}/${id}:`, error);
    throw error;
  }
};
