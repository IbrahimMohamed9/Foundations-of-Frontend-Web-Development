var Constants = {
  get_api_base_url: () => {
    if (location.hostname == "localhost") {
      return "http://localhost/IT-207-Introduction-to-Web-Programming/backend/";
    } else {
      return "https://balqan.net/backend/";
    }
  },
  latestActivitiesLimit: 3,
  newPackageLimit: 2,
};
