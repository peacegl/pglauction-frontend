import React from 'react';
import PropTypes from 'prop-types';
import useDownloader from 'react-use-downloader';

export default function DownloadFile(props) {
  const {size, elapsed, percentage, download, cancel, error, isInProgress} =
    useDownloader();
  return (
    <div className='App'>
      <p>Download is in {isInProgress ? 'in progress' : 'stopped'}</p>
      <button onClick={() => download(props.fileUrl, props.filename)}>
        Click to download the file
      </button>
      <button onClick={() => cancel()}>Cancel the download</button>
      <p>Download size in bytes {size}</p>
      <label htmlFor='file'>Downloading progress:</label>
      <progress id='file' value={percentage} max='100' />
      <p>Elapsed time in seconds {elapsed}</p>
      {error && <p>possible error {JSON.stringify(error)}</p>}
    </div>
  );
}
DownloadFile.propTypes = {
  fileUrl: PropTypes.string,
  filename: PropTypes.string,
};
