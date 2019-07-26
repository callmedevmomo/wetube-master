import axios from "axios";

let target;
let commentId;

const commentNumber = document.getElementById("jsCommentNumber");

const delBtn = document.getElementById("js-commentDelete");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const handleRemoveComment = async event => {
  event.preventDefault();
  target = await event.target.parentNode;
  commentId = await event.srcElement.id;
  try {
    const response = await axios({
      url: `/api/${commentId}/comment/remove`,
      method: "POST"
    });

    if (response.status === 200) {
      target.parentNode.remove();
      decreaseNumber();
    }
  } catch (error) {
    console.log(error);
  }
};

function init() {
  delBtn.addEventListener("click", handleRemoveComment);
}

if (delBtn) {
  init();
}
