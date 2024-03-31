// Dans BoardContainerCube.jsx
const BoardContainerCube = ({ color }) => {
    // Appliquez le style en ligne ou par une classe conditionnelle
    console.log(color);
    const style = {
        backgroundColor: color || 'transparent', // Utilisez 'transparent' au lieu de 'undefined'
        border: '1px solid',
      // Autres styles...
    };
  
    return <div style={style} />; // Ou className si vous utilisez des classes CSS
  };
  