import api_config from "@/lib/api_config";

export type GroupRequest = {
  name: string;
  country: string;
  adress: string;
  dateFrom: string;
  dateTo: string;
  carId: number | null;
  employeesId: number[];
};

export type GroupResponse = GroupRequest & {
    id: number;
};

// Create group
export const createNewGroup = async (group: GroupRequest): Promise<GroupResponse> => {
  const createCarResponse = await api_config.post<GroupResponse>("/groups", group);
  return createCarResponse.data;
};

// Get all
export const getAllGroups = async (): Promise<GroupResponse[]> => {
  const getAllGroupsResponse = await api_config.get<GroupResponse[]>("/groups");
  return getAllGroupsResponse.data;
};

// Get list of group
export const getGropList = async (groupId: number) => {
  const getList = await api_config.get(`/groups/${groupId}/employees`);
  return getList.data;
};

// Update group 
// Update group
export const updateGroup = async (groupId: number, group: GroupRequest): Promise<GroupResponse> => {
  const updateGroupResponse = await api_config.put<GroupResponse>(`/groups/${groupId}`, group);
  return updateGroupResponse.data;
};

export const deleteGroup = async(id: number): Promise<void> => {
  await api_config.delete(`/groups/${id}`);;
}
