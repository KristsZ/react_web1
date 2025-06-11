import Virsraksts from './Virsraksts';
import Kartiņa from './Kartiņa';
import Posts from './Posts';

import { useState } from "react";

function KursuSaraksts() {
    const kartinas = [
    {
      nosaukums: "Kursi React",
      apraksts: "Online kursi par React",
      attēls: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/800px-React-icon.svg.png",
      fons: "red"
    },
    {
      nosaukums: "Kursi Javascript",
      apraksts: "Online kursi par Javascript",
      attēls: "https://2ality.com/2011/10/logo-js/js.jpg"
    },
    {
      nosaukums: "Kursi HTML+CSS",
      apraksts: "Online kursi par HTML+CSS",
      attēls: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnt0s4-cSHFsZEacCtBUlw-mhL3CW2mI-KJw&s",
      fons: "green"
    },
    {
      nosaukums: "Kursi Python",
      apraksts: "Pilns ievads Python programmēšanā",
      attēls: "https://www.python.org/static/community_logos/python-logo.png",
      fons: "blue"
    },
    {
      nosaukums: "Kursi SQL",
      apraksts: "SQL pamati datu bāzu vadībai",
      attēls: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png"
    },
    {
      nosaukums: "Kursi Git un GitHub",
      apraksts: "Versiju kontrole ar Git un GitHub",
      attēls: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
      fons: "#24292e"
    },
    {
      nosaukums: "Kursi Node.js",
      apraksts: "Server-side programmēšana ar Node.js",
      attēls: "https://nodejs.org/static/images/logo.svg",
      fons: "#026e00"
    },
    {
      nosaukums: "Kursi Web Dizains",
      apraksts: "UX/UI dizaina pamati iesācējiem",
      attēls: "https://cdn-icons-png.flaticon.com/512/1822/1822922.png",
      fons: "#e0e0e0"
    }
  ];

  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState("");


  const clickHandler = () => { setVisible(!visible) };


     if (visible) {
    return (
      <div className="App" id="app">
        <input type="text" onKeyUp={
          (e) => {
            setValue(e.target.value)
          }
        } /><br />
        <button onClick={
          clickHandler
        }>Paslēpt</button>

        <Virsraksts text={value} />

        <div className="cards" >
          {kartinas.map((item, i) => {
            return (
              <Kartiņa nosaukums={item.nosaukums} apraksts={item.apraksts} attēls={item.attēls} fons={item.fons} key={i}/>)
          })}
        </div>
        {/* Cards ends */}
        <Posts />
      </div>
    );
  } else {
    return (
      <div className="App" id="app">
        <button onClick={
          clickHandler
        }>Rādīt</button>
        <Virsraksts />
      </div>
    )
  }
}

export default KursuSaraksts;