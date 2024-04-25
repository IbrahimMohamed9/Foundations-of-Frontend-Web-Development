var FeedbackService = {
  loadTable: () => {
    RestClient.get("feedbacks/get_feedbacks.php", (data) => {
      const tableBody = document.querySelector("#tbl_feedbacks tbody");

      tableBody.innerHTML = "";
      data.forEach((feedbackdata) => {
        FeedbackService.loadTableRow(tableBody, feedbackdata);
      });
    });
  },
  loadTableRow: (tableBody, feedbackdata) => {
    tableBody.innerHTML += `
      <tr>
        <td>${feedbackdata.name}</td>
        <td>${feedbackdata.phone}</td>
        <td>${feedbackdata.email}</td>
        <td>${feedbackdata.added_time}</td>
        <td>${feedbackdata.message}</td>
        <td>
          <button
            class="txt-c d-block fs-15 rad-6 bg-blue c-white w-81 btn-shape"
            onClick="FeedbackService.openEditFeedbackModal(${feedbackdata.feedback_id})"
          >
            Edit
          </button>
          <button
            class="txt-c mt-10 d-block fs-15 rad-6 bg-red c-white w-81 btn-shape"
            onClick="FeedbackService.removeFeedback(${feedbackdata.feedback_id})"
          >
            Remove
          </button>
        </td>
      </tr>
    `;
  },
  addFeedbackModal: (message) => {
    const modal = document.getElementById("myModal");
    modal.innerHTML = `
    <div class="master-container">
      <div class="card cart">
        <div class="top-title">
          <span class="title">Add Feedback</span>
          <i class="fa-solid fa-xmark x"></i>
        </div>
        <div class="form">
          <form id="feedback-form">
            <div class="inputs">
              <input type="hidden" id="feedback_id" name="feedback_id" />
              <div class="form-control">
                <input type="text" class="field" required id="name" name="name" />
                <label for="name"> Name </label>
              </div>
              <div class="form-control">
                <input type="text" class="field" required id="phone" name="phone" />
                <label for="phone"> phone </label>
              </div>
              <div class="form-control full">
                <input type="text" class="field" required id="email" name="email" />
                <label for="email"> email </label>
              </div>
              <!-- <div class="form-control">
                <input
                  type="text"
                  id="country"
                  name="country"
                  class="field"
                  required
                />
                <label for="country"> Country </label>
              </div> -->
              <div class="form-control full">
                <input type="datetime-local" id="added_time" name="added_time" />
              </div>
            </div>
            <div class="textareas">
              <div class="form-control">
                <div class="textarea">
                  <textarea
                    id="message"
                    name="message"
                    required
                    class="field"
                  ></textarea>
                </div>
                <label for="message" class="txtar-la"> Message </label>
              </div>
            </div>
            <input type="submit" class="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
    `;
    Utils.formSetup(modal, () => {
      Utils.submit(
        "feedback-form",
        "feedbacks/add_feedback.php",
        message,
        () => {
          FeedbackService.loadTable("tbl_feedbacks");
        },
        modal
      );
    });
  },
  openEditFeedbackModal: (feedback_id) => {
    RestClient.get(
      "feedbacks/get_feedback.php?feedback_id=" + feedback_id,
      (data) => {
        FeedbackService.addFeedbackModal("Feedback edited successfully");

        $("#myModal input[name='feedback_id']").val(data.feedback_id);
        $("#myModal input[name='name']").val(data.name);
        $("#myModal input[name='phone']").val(data.phone);
        $("#myModal input[name='email']").val(data.email);
        $("#myModal input[name='added_time']").val(data.added_time);
        $("#myModal textarea[name='message']").val(data.message);
        // $("#myModal input[name='country']").val(data.country);
        Utils.formAnimation();
      }
    );
  },
  removeFeedback: (id) => {
    if (
      confirm("Do you want to delete feedback with the id " + id + "?") == true
    ) {
      RestClient.delete(
        "feedbacks/delete_feedback.php?feedback_id=" + id,
        {},
        () => {
          FeedbackService.loadTable("tbl_feedbacks");
        }
      );
    }
  },
};
