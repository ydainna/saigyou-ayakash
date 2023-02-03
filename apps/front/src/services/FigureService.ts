import api from "@axios/FetchInterceptor";

const figureService: any = {};

// retrieves information from the figurines database
figureService.getAll = async () => {
  const res = await api("/figures", {
    method: "GET",
    // x-public-request is a custom header that allows the request to be made without authentication
    headers: { "X-Public-Request": "true" },
  });
  return res.data;
};

// retrieves various information for collection statistics
// (update, price total and number object total)
figureService.getStats = async () => {
  const res = await api("/stats", {
    method: "GET",
    // x-public-request is a custom header
    // that allows the request to be made without authentication
    headers: { "X-Public-Request": "true" },
  });
  return res.data;
};

// adds a figure to the database
figureService.add = async (data: any) => {
  const res = await api("/admin/figures", {
    method: "POST",
    headers: {
      // application/json is the default content type for axios
      Accept: "application/json",
      // multipart/form-data is required for file uploads
      "Content-Type": "multipart/form-data",
    },
    data,
  });
  return res.data;
};

// deletes a figure from the database
figureService.deleteFigure = async (uuid: string) => {
  const res = await api(`/admin/figures/${uuid}`, {
    method: "DELETE",
    headers: {
      // application/json is the default content type for axios
      Accept: "application/json",
      // multipart/form-data is required for file uploads
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

// updates a figure in the database
figureService.updateFigure = async (uuid: string, data: any) => {
  const res = await api(`/admin/figures/${uuid}`, {
    method: "PATCH",
    headers: {
      // application/json is the default content type for axios
      Accept: "application/json",
      // multipart/form-data is required for file uploads
      "Content-Type": "application/json",
    },
    data,
  });
  return res.data;
};

export default figureService;
