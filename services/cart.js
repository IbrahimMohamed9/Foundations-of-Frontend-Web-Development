var CartService = {
  removeCart: function (id) {
    if (
      confirm("Do you want to delete feedback with the id " + id + "?") == true
    ) {
      RestClient.delete(
        "feedbacks/delete_feedback.php?feedback_id=" + id,
        {},
        () => {}
      );
    }
  },
};
