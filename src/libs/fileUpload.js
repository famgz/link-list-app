import toast from 'react-hot-toast';

export default async function fileUpload(ev, callBackFn) {
  const file = ev.target.files?.[0];

  if (!file) {
    console.log('No file was found');
    return false;
  }

  const promise = new Promise((resolve, reject) => {
    const data = new FormData();
    data.set('file', file);
    fetch('/api/upload', {
      method: 'POST',
      body: data,
    }).then((res) => {
      if (res.ok) {
        res.json().then((link) => {
          console.log(link);
          callBackFn(link);
          resolve(link);
        });
      } else {
        reject();
      }
    });
  });

  await toast.promise(promise, {
    loading: 'Uploading...',
    success: 'Uploaded!',
    error: 'Upload error',
  });
}