
import { useState } from 'react';

function App() {
  const [obras, setObras] = useState([]);
  const [novaObra, setNovaObra] = useState('');
  const [imagens, setImagens] = useState({});

  const adicionarObra = () => {
    if (novaObra.trim() === '') return;
    setObras([...obras, novaObra]);
    setNovaObra('');
  };

  const handleUpload = (e, obra) => {
    const files = Array.from(e.target.files);
    setImagens(prev => ({
      ...prev,
      [obra]: [...(prev[obra] || []), ...files.map(file => URL.createObjectURL(file))]
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      <h1>Controle de Obras</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nome da obra"
          value={novaObra}
          onChange={(e) => setNovaObra(e.target.value)}
        />
        <button onClick={adicionarObra} style={{ marginLeft: '10px' }}>Adicionar Obra</button>
      </div>

      {obras.map((obra, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
          <h3>{obra}</h3>
          <input type="file" multiple onChange={(e) => handleUpload(e, obra)} />
          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px', gap: '10px' }}>
            {(imagens[obra] || []).map((src, i) => (
              <img key={i} src={src} alt="" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
