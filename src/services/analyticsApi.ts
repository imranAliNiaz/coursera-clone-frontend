import instructorApi from "./instructorApiClient";
import { ENDPOINTS } from "./endpoints";

export const analyticsApi = {
  getInstructorOverview: async () => {
    const response = await instructorApi.get(ENDPOINTS.ANALYTICS_INSTRUCTOR);
    return response.data;
  },
  getInstructorTimeseries: async () => {
    const response = await instructorApi.get(
      ENDPOINTS.ANALYTICS_INSTRUCTOR_TIMESERIES,
    );
    return response.data;
  },
};
