import axios from "axios";

const commentNumber = document.getElementById("jsCommentNumber");

const delBtn = document.getElementById("js-commentDelete");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const handleRemoveComment = async event => {
  event.preventDefault();
  const target = await event.target.parentNode;
  const commentId = await event.target.id;
  const response = await axios({
    url: `/api/${commentId}/comment/remove`,
    method: "POST"
  });
  if (response.status === 200) {
    await target.parentNode.remove();
    decreaseNumber();
  }
};

function init() {
  delBtn.addEventListener("click", handleRemoveComment);
}

if (delBtn) {
  init();
}
