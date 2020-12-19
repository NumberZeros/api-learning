module.exports = {
  GengerateCode(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  DevicePagination(pagination) {
    try {
      const { limit, page, search } = pagination;
      return {
        limit: parseInt(limit),
        page: parseInt(page),
        search,
        nextPage: parseInt(page) + 1,
        skip: parseInt(page) * parseInt(limit),
      };
    } catch (err) {
      console.log(err);
    }
  },
};
