var RestClient = {
  get: (url, callback, error_callback) => {
    $.ajax({
      url: Constants.API_BASE_URL + url,
      type: "GET",
      success: (response) => {
        if (callback) callback(response);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        if (error_callback) {
          error_callback(jqXHR);
        } else {
          // toastr.error(jqXHR.responseJSON.message);
          console.error(jqXHR);
        }
      },
    });
  },
  request: (url, method, data, callback, error_callback) => {
    $.ajax({
      url: Constants.API_BASE_URL + url,
      type: method,
      data: data,
    })
      .done((response, status, jqXHR) => {
        if (callback) callback(response);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        if (error_callback) {
          error_callback(jqXHR, textStatus, errorThrown);
        } else {
          // toastr.error(jqXHR.responseJSON.message);
          console.error(jqXHR);
        }
      });
  },
  post: (url, data, callback, error_callback) => {
    RestClient.request(url, "POST", data, callback, error_callback);
  },
  delete: (url, data, callback, error_callback) => {
    RestClient.request(url, "DELETE", data, callback, error_callback);
  },
  put: (url, data, callback, error_callback) => {
    RestClient.request(url, "PUT", data, callback, error_callback);
  },
};
