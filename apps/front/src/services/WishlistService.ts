import api from "@axios/FetchInterceptor";

const wishlistService: any = {};

//retrieves information from the wishlist database
wishlistService.getAll = async () => {
  const res = await api("/wishlist", {
    method: "GET",
    headers: { "X-Public-Request": "true" },
  });
  return res.data;
};

// adds a new item to the wishlist database
wishlistService.add = async (data: any) => {
  const res = await api("/admin/wish", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data,
  });
  return res.data;
};

// deletes an item from the wishlist database
wishlistService.delete = async (uuid: string) => {
  const res = await api(`/admin/wish/${uuid}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export default wishlistService;
