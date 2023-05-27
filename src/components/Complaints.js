import { useState, useEffect } from 'react';

const Complaints = (props) => {

const [imageUrl, setImageUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleInputChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleDownload = () => {
    fetch('http://localhost:5000/download-image?url=' + encodeURIComponent(imageUrl), {
      method: 'GET',
      headers: {
        'Content-Type': 'image/jpeg', // Ustaw typ zawartości obrazu, jeśli jest znany
      },
      responseType: 'blob',
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };

   
    return ( 
        <>
        <div className='content2'>
            <div className='logging'>
            <h2>Reklamacje</h2>
            <button onClick={() => props.changeState(0)}>Anuluj</button>
            <input type="text" value={imageUrl} onChange={handleInputChange} />
            <button onClick={handleDownload}>Pobierz</button>
            {downloadUrl && (
                <div>
                <p>Pobrane zdjęcie:</p>
                <img src={downloadUrl} alt="Pobrane zdjęcie" />
                </div>
            )}
            </div>
        </div>
        </>
     );
 }

 export default Complaints;