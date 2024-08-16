import React from 'react'
import './Body.css'
import { FaInstagram,FaLinkedin} from "react-icons/fa";
import { FiMail } from "react-icons/fi";

function Body() {
  return (
    <div className='main'>
        <div className='welcome'>
            <h2><span className='hesapKitap'>HesapKitap</span>'a Hoşgeliniz</h2>
            <p>Burada, hem sağlığınızı hem de matematiksel hesaplarınızı kolayca yapabileceğiniz bir platform sunduk. İster vücut kitle indeksinizi hesaplayın, ister günlük su ihtiyacınızı öğrenin ya da matematiksel problemlerinizin üstesinden gelin - tüm hesaplamalar elinizin altında! <br/><br />
            Sağlık bölümümüzde, vücut kitle indeksinden metabolizma hızınıza kadar çeşitli hesaplamalarla sağlığınızı takip edebilir, Matematik bölümümüzde ise pratik matematiksel araçlarla problemlerinizi hızlıca çözebilirsiniz. <br /><br />
            Hedefimiz, karmaşık hesaplamaları sizin için basit hale getirmek. Hadi, başlayalım!</p>
        </div>
        <div className='connect'>
            <h3>İletişim</h3>
            <p>Önerilerinize açığız aşağıdaki linklerden bize ulaşabilirsiniz.</p>
            <div className='links'>
                <button className='card1'><FaInstagram className='link'/></button>
                <button className='card2'><FiMail className='link'/></button>
                <button className='card3'><FaLinkedin className='link'/></button>
            </div>
        </div>
    </div>
  )
}

export default Body
