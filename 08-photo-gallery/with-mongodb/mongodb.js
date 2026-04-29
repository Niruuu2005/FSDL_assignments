fetch('/api/app-data')
  .then((res) => {
    if (!res.ok) throw new Error('Request failed');
    return res.json();
  })
  .then((data) => {
    window.mongodbData = data;
    document.body.dataset.mongodb = 'connected';
  })
  .catch(() => {
    document.body.dataset.mongodb = 'error';
  });
