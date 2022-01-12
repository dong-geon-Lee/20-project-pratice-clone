const video = document.getElementById("video");
const btn = document.getElementById("btn");

const showDevice = async () => {
  try {
    const mediaDevice = await navigator.mediaDevices.getDisplayMedia();

    video.srcObject = mediaDevice;

    video.onloadedmetadata = () => {
      video.play();
    };
  } catch (err) {
    console.log(err);
  }
};

btn.addEventListener("click", async () => {
  btn.disabled = true;

  await video.requestPictureInPicture();

  btn.disabled = false;
});

showDevice();
